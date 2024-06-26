// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function client(endpoint, { body, ...customConfig } = {}) {
    const headers = { 'Content-Type': 'application/json' };

    const config = {
        method: body ? 'POST' : 'GET',
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    let data;
    try {
        const response = await window.fetch(endpoint, config);
        data = await response.json();
        if (response.ok) {
            return data;
        }
        throw new Error(response.statusText);
    } catch (err) {
        return Promise.reject(err.message ? err.message : data);
    }
}

client.get = function (endpoint, customConfig = {}) {
    return client(endpoint, { ...customConfig, method: 'GET' });
};

client.post = function (endpoint, body, customConfig = {}) {
    return client(endpoint, { ...customConfig, body });
};

client.put = function (endpoint, body, customConfig = {}) {
    return client(endpoint, { ...customConfig, method: 'PUT', body });
};

client.patch = function (endpoint, body, customConfig = {}) {
    return client(endpoint, { ...customConfig, method: 'PATCH', body });
};

client.delete = function (endpoint, customConfig = {}) {
    return client(endpoint, { ...customConfig, method: 'DELETE' });
};
