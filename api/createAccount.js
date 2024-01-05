const fetch = require('node-fetch');

export default async function(req, res) {
    const { name, email, pass, nick, lang, namecolor, avatar, code } = req.body;

    try {
        const response = await fetch('https://api.github.com/repos/red-rc/locales/issues', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GITHUB_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: `${name}`,
                body: `
                    Name: ${name}
                    Email: ${email}
                    Password: ${pass}
                    Nickname: ${nick}
                    Language: ${lang}
                    Namecolor: ${namecolor}
                    Avatar: ${avatar}
                    Code: ${code}
                `
            }),
        });

        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
