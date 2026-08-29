import { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import { db } from '../config/db.js';

let genAIClient: GoogleGenAI | null = null;

function getAIClient(): GoogleGenAI | null {
  if (!genAIClient && process.env.GEMINI_API_KEY) {
    genAIClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return genAIClient;
}

export const chatWithAssistant = async (req: Request, res: Response) => {
  try {
    const { message, conversationHistory } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    const products = await db.getProducts();
    const productsContext = products.map(p => 
      `- ${p.name} (৳${p.price}, ${p.category}): ${p.description} [Rating: ${p.rating}★, Stock: ${p.stock}]`
    ).join('\n');

    const systemPrompt = `You are "CookMe AI Assistant", the friendly, knowledgeable, and helpful smart shopping assistant for the CookMe / Adnan online store in Bangladesh.
Current Store Currency: Bangladeshi Taka (৳).
Available Store Catalog:
${productsContext}

Store Policies:
- Delivery: Inside Dhaka ৳60 (1-2 days), Outside Dhaka ৳120 (3-5 days).
- Payment: Cash on Delivery, bKash, Nagad, Visa, Mastercard.
- Returns: 7 days hassle-free return policy.
- Welcome Coupon: "COOKME10" for 10% off.

Instructions:
1. Provide concise, enthusiastic, and direct shopping advice, styling recommendations, sizing tips, and product links/mentions.
2. If asked about clothing or styling (e.g. Graphic Tees, Blazers, Saree, Sneakers, Sunglasses), recommend items directly from the catalog with exact prices in ৳.
3. If asked about cooking or recipes, provide delicious recipes and recommend pairing food with a comfortable casual outfit or kitchen essentials.
4. Keep answers friendly, formatted with clean bullet points or bold text, and avoid robotic fluff.`;

    const ai = getAIClient();

    if (ai) {
      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: [
          { role: 'user', parts: [{ text: `${systemPrompt}\n\nUser Question: ${message}` }] }
        ]
      });

      const reply = response.text || "Hello! I'm your CookMe Shopping Assistant. How can I help you find the best deals, outfits, or track your orders today?";
      return res.json({ success: true, reply });
    } else {
      // Intelligent fallback when GEMINI_API_KEY is not yet provided
      const q = message.toLowerCase();
      let reply = "Hello! I'm your CookMe assistant. ";
      if (q.includes('price') || q.includes('cost') || q.includes('sneaker') || q.includes('shoe')) {
        reply += "Our Classic White Sneakers are currently available for ৳2,490 (17% off). We offer fast delivery across Dhaka and all over Bangladesh!";
      } else if (q.includes('delivery') || q.includes('shipping')) {
        reply += "We deliver Inside Dhaka for ৳60 within 24-48 hours, and Outside Dhaka for ৳120 within 3-5 days. Cash on Delivery is available!";
      } else if (q.includes('discount') || q.includes('offer') || q.includes('coupon')) {
        reply += "You can use the promo code **COOKME10** at checkout for an instant 10% discount on your order!";
      } else if (q.includes('kid') || q.includes('shirt')) {
        reply += "Check out our popular Kids Graphic T-Shirt Pack for ৳990 (18% OFF) and the warm Kids Hoodie for ৳1,290!";
      } else {
        reply += `Welcome to CookMe! We offer top quality fashion, footwear, sarees, sunglasses, and curated essentials. Let me know what you're shopping for today!`;
      }
      return res.json({ success: true, reply });
    }
  } catch (error: any) {
    console.error('AI chat error:', error);
    res.json({
      success: true,
      reply: "I'm here to help! Browse our Flash Sales for great discounts or let me know if you need specific product recommendations in Men, Women, Kids, or Footwear!"
    });
  }
};
