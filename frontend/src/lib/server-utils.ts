"use server";

import { headers } from "next/headers";
import { userAgent } from "next/server";

export async function getIsMobile() {
    const { device } = userAgent({ headers: await headers() })
    const isMobile = device?.type === 'mobile'
    return isMobile;
}

export async function getApiUrl() {
    return process.env.API_URL;
}

export async function getBaseUrl() {
    const headersList = await headers();
    const host = headersList.get('host');
    const protocol = headersList.get('x-forwarded-proto') || 'http';
    const baseUrl = `${protocol}://${host}`;
    return baseUrl;
}