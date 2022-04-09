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
        let initial = $(`#${this.currentPage}`);
        initial.css('opacity', '1');
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
        wait(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        openWindow(link) {
            window.open(link, '_blank');
        },
        async switchPage(page) {
            // Page transition
            if (this.currentPage != page) {
                $(`#${this.currentPage}`).css('opacity', '0');
                this.currentPage = page;
                await this.wait(50);
                $(`#${page}`).css('opacity', '1');
            }
        }
    },
    computed: {}
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
