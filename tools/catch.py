import requests
from bs4 import BeautifulSoup
import pandas as pd
import time

# 伪装请求头，防止被对方服务器拦截
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

# 您需要爬取的百胜官网分类列表页 URL (这里以 2冲程 为例)
CATEGORY_URL = "https://www.parsunpower.cn/electric-outboard/"
# 设定导入到 BigCommerce 时的默认分类名
BC_CATEGORY_NAME = "Outboard Motors; E-Stroke" 

def get_product_links(category_url):
    """从分类页提取所有产品的详情页链接"""
    print(f"正在抓取分类页: {category_url}")
    response = requests.get(category_url, headers=HEADERS)
    response.encoding = 'utf-8'
    soup = BeautifulSoup(response.text, 'html.parser')
    
    links = []
    # 定位产品列表块 (根据百胜网站的 HTML 结构，产品通常在特定的列表标签内)
    # 这里通过寻找带有具体产品 html 后缀的 a 标签来宽泛匹配
    for a in soup.find_all('a', href=True):
        href = a['href']
        if 'html' in href and ('电动' in href):
            full_url = href if href.startswith('http') else f"https://www.parsunpower.cn{href}"
            if full_url not in links:
                links.append(full_url)
    return links

def scrape_product_page(product_url):
    """解析单个产品页，提取名称、描述和图片库"""
    print(f"解析产品: {product_url}")
    try:
        response = requests.get(product_url, headers=HEADERS)
        response.encoding = 'utf-8'
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # 1. 提取产品名称 (通常在 h1 或 title)
        name_tag = soup.find('h1')
        product_name = name_tag.text.strip() if name_tag else "Parsun Outboard Motor"
        
        # 2. 提取规格表格转为 HTML 描述
        description_html = ""
        table = soup.find('table')
        if table:
            # 清理表格样式，使其在 Next.js 中更干净
            description_html = f"<h2>{product_name} Specifications</h2>" + str(table)
        
        # 3. 提取高清图片集
        image_urls = []
        # 通常百胜网站的高清大图都在特定的 img 标签内，且路径带有 watermark 或 upload
        for img in soup.find_all('img'):
            src = img.get('src', '')
            if 'watermark' in src :
                full_img_url = src if src.startswith('http') else f"https://www.parsunpower.cn{src}"
                if full_img_url not in image_urls:
                    image_urls.append(full_img_url)
        
        # 模拟真实用户的访问停顿，防止触发反爬虫机制被封 IP
        time.sleep(2) 
        
        return {
            "Name": product_name,
            "SKU": product_name.split()[0], # 简易提取型号作为 SKU
            "Description": description_html,
            "Images": image_urls[:5] # 最多只取前 5 张图，保持页面加载速度
        }
    except Exception as e:
        print(f"抓取失败 {product_url}: {e}")
        return None

def generate_bigcommerce_csv(products_data, filename="bc_batch_import.csv"):
    """将抓取到的内存数据转化为 BigCommerce V3 父子层级 CSV"""
    columns = [
        "Item", "Name", "Type", "SKU", "Price", "Weight", 
        "Category", "Is Visible", "Description", 
        "Image URL (Import)", "Image is Thumbnail", "Image Sort Order"
    ]
    
    rows = []
    
    for pd_data in products_data:
        if not pd_data: continue
        
        # 构建主商品行 (Product)
        product_row = {
            "Item": "Product",
            "Name": pd_data["Name"],
            "Type": "physical",
            "SKU": pd_data["SKU"],
            "Price": "0.00", # 注意：爬虫不爬价格，因为 B2C 定价策略需您自己定
            "Weight": "15",  # 默认重量，后期按需修改
            "Category": BC_CATEGORY_NAME, # 自动分配到指定分类，解决之前前端不显示的问题
            "Is Visible": "True",
            "Description": pd_data["Description"]
        }
        rows.append(product_row)
        
        # 构建图片行 (Image)
        for i, img_url in enumerate(pd_data["Images"]):
            image_row = {
                "Item": "Image",
                "Image URL (Import)": img_url,
                "Image is Thumbnail": "True" if i == 0 else "False",
                "Image Sort Order": str(i)
            }
            # 其余必须留空以继承父商品
            for col in columns:
                if col not in image_row:
                    image_row[col] = ""
            rows.append(image_row)
            
    df = pd.DataFrame(rows, columns=columns)
    df.to_csv(filename, index=False, encoding="utf-8-sig")
    print(f"\n✅ 成功导出 {len(products_data)} 个商品数据到 {filename}")

# --- 主程序执行入口 ---
if __name__ == "__main__":
    links = get_product_links(CATEGORY_URL)
    print(f"共发现 {len(links)} 个潜在产品链接。开始深度抓取...\n")
    
    scraped_data = []
    # 为了测试效率，您可以先把 links 改为 links[:3] 只抓取前3个测试
    for link in links:
        data = scrape_product_page(link)
        if data:
            scraped_data.append(data)
            
    generate_bigcommerce_csv(scraped_data, "parsun_Estroke_batch.csv")