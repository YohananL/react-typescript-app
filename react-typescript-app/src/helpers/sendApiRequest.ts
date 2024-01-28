type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

function formRequestInfo(method: HttpMethod, data: unknown): RequestInit {
    if (method === 'GET') {
        return {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        };
    }

    return {
        method: method,
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    };
}

export async function sendApiRequest<T>(
    url: string,
    method: HttpMethod,
    data: unknown = {},
): Promise<T> {
    const response = await fetch(url, formRequestInfo(method, data));

    if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
    }

    return (await response.json()) as Promise<T>;
}
