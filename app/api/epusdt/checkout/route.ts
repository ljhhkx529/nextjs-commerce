import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const amount = searchParams.get('amount');

    // 🔑 关键点 1：使用时间戳生成唯一 ID，彻底避开 10002 报错
    const testOrderId = `TEST_ORDER_${Date.now()}`;

    // ⚠️ 检查这里的环境变量，建议直接先写死测试，通了再换回 process.env
    const apiToken = 'parsun_secret_key_888'; 
    const epusdtUrl = 'http://127.0.0.1:8000';

    // 2. 构造最精简的参数
    const params: Record<string, any> = {
      amount: Number(amount),
      notify_url: `http://127.0.0.1:3000/api/epusdt/webhook`,
      order_id: testOrderId,
      redirect_url: `http://127.0.0.1:3000/order-success`,
    };

    // 3. 严格按照 ASCII 字典序生成签名
    const sortedKeys = Object.keys(params).sort();
    let signStr = '';
    sortedKeys.forEach((key) => {
        if (params[key] !== '' && params[key] !== undefined) {
            signStr += `${key}=${params[key]}&`;
        }
    });
    // 去掉最后一个 & 并拼接 token
    signStr = signStr.slice(0, -1) + apiToken;
    const signature = crypto.createHash('md5').update(signStr).digest('hex');

    console.log("🛠 待签名字符串:", signStr);
    console.log("🛠 生成签名:", signature);

    // 4. 发起请求
    const response = await fetch(`${epusdtUrl}/api/v1/order/create-transaction`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...params, signature })
    });

    const data = await response.json();

    if (data.status_code === 200) {
      let paymentUrl = data.data.payment_url;
      if (paymentUrl.startsWith('/')) paymentUrl = epusdtUrl + paymentUrl;
      return NextResponse.redirect(paymentUrl);
    }

    // 👇 关键点 2：如果失败，把 Epusdt 的原生报错吐出来，别只报 "connection failed"
    return NextResponse.json({ 
      error: "Epusdt 拒绝了请求", 
      epusdt_response: data 
    }, { status: 400 });

  } catch (err: any) {
    return NextResponse.json({ error: "网络连接失败", message: err.message }, { status: 500 });
  }
}