// ================= 1. 填入你的凭证 =================
const STORE_HASH = 'ecns8bbkyq'; 
const ACCESS_TOKEN = '6bjyan6mj69sh73k7ai1c6vkihf9jdw';

async function createAwaitingPaymentOrder() {
    const url = `https://api.bigcommerce.com/stores/${STORE_HASH}/v2/orders`;

    // ================= 2. 构造订单数据 =================
    // 必填项：billing_address 和 products
    const orderPayload = {
        status_id: 7, // 🔥 核心：7 代表 "Awaiting Payment"
        billing_address: {
            first_name: "Jack",
            last_name: "Smith",
            street_1: "123 Commerce St",
            city: "Austin",
            state: "Texas",
            zip: "78701",
            country_iso2: "US",
            email: "jack.smith@example.com"
        },
        products: [
            {
                // ⚠️ 注意：这里必须填入你 BigCommerce 后台真实存在的商品 ID！
                product_id: 150, 
                quantity: 1
            }
        ]
    };

    console.log("🚀 正在向 BigCommerce 提交新订单...");

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'X-Auth-Token': ACCESS_TOKEN,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderPayload)
        });

        // 捕获 API 报错（比如商品 ID 不存在，或者格式不对）
        if (!response.ok) {
            const errorDetails = await response.json();
            console.error(`❌ 创建失败! HTTP 状态码: ${response.status}`);
            console.error("错误详情:", JSON.stringify(errorDetails, null, 2));
            return;
        }

        const newOrder = await response.json();
        
        console.log("✅ 订单创建成功！");
        console.log(`📦 新订单 ID: ${newOrder.id}`);
        console.log(`💳 订单状态: ${newOrder.status} (Status ID: ${newOrder.status_id})`);
        console.log(`💰 订单总额: $${newOrder.total_inc_tax}`);

    } catch (error) {
        console.error("❌ 网络请求报错:", error);
    }
}

// 运行函数
createAwaitingPaymentOrder();