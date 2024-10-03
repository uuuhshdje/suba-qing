function handler() {
    try {
        const content = fetch('https://uapisfm.tvbanywhere.com.sg/geoip/check/platform/android', {
            headers: {
                'User-Agent': 'curl/8.8.0',
                'Accept': '*/*'
            },
            retry: 3,
            timeout: 5000,
        });
        if (!content) {
            return {
                text: 'N/A',
                background: grey,
            };
        } else {
            let String = "";
            let color = "";
            let jsonString = JSON.parse(content.body);
            const stat = jsonString.AllowInThisCountry;
            const country = jsonString.country;

            if (stat) {
                String = `解锁(${country})`;
                color = DEF_UNL;
            } else {
                String = `失败(${country})`;
                color = DEF_NA;
            } 
            return {
                text: String,
                background: color,
            };
        }
    } catch(err) {
        return {
            text: 'N/A',
            background: grey,
        };
    }
}