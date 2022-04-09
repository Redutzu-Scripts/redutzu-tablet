const date = new Date();

const app = new Vue({
    el: '#tablet',
    data: {
        opened: false,
        currentPage: 'main',
        Calendar: {
            day: date.toLocaleDateString('en-US', { 
                weekday: 'long' 
            }),
            date: date.getDate()
        }, 
        Crypto: [
            { name: 'Bitcoin', icon: 'img/btc.svg', description: 'Your gateway to Bitcoin & beyond' }, 
            { name: 'Ethereum', icon: 'img/eth.svg', description: 'The tech is new and ever-evolving' }, 
            { name: 'Avalanche', icon: 'img/avax.svg', description: 'Blazingly Fast, Low Cost & Eco-Friendly' }
        ],
        Applications: [
            { name: 'Information', icon: 'img/info.svg', href: 'info' }, 
            { name: 'Controls', icon: 'img/controls.svg', href: 'keybinds' }
        ]
    },
    mounted() {
        let initial = document.getElementById(this.currentPage);
        initial.style.opacity = 1;
    },
    methods: {
        async post(url, data = {}) {
            const response = await fetch(`https://${GetParentResourceName()}/${url}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            return await response.json();
        },
        setPageOpacity(id, value) {
            let page = document.getElementById(id);
            page.style.opacity = value;
        },
        async switchPage(page) {
            if (this.currentPage == page) return;

            this.setPageOpacity(this.currentPage, 0);
            this.currentPage = page;

            setTimeout(() => {
                this.setPageOpacity(page, 1);
            }, 50);
        }
    }
});

window.addEventListener('message', async ({ data }) => {
    switch(data.action) {
        case 'open':
            app.opened = true;
            break;
        case 'close':
            app.opened = false;
            break;
    }
});

window.addEventListener('keydown', async ({ key }) => {
    let which = key.toLowerCase();

    if (which == 'escape')
        return await app.post('close');
});
