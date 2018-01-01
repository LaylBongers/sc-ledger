<template>
<div id="app">
    <div class="container-fluid text-light">
        <div class="row">
            <div class="col-12 col-md-6 mt-3"><h2>Lorem Ipsum</h2></div>

            <AddPriceLog @submitted="priceLogSubmitted" />

            <PriceLogs :price-logs="priceLogs" />
        </div>
    </div>
</div>
</template>

<script>
import AddPriceLog from './AddPriceLog'
import PriceLogs from './PriceLogs'

export default {
    name: 'sc-ledger',
    components: {
        AddPriceLog,
        PriceLogs,
    },
    data () {
        return {
            priceLogs: [
                {
                    timestamp: new Date(),
                    location: 'Port Olisar',
                    changes: [
                        {
                            resource: 'Hydrogen',
                            buy: 0.8,
                            sell: null,
                        },
                    ],
                }, {
                    timestamp: new Date(),
                    location: 'Grim HEX',
                    changes: [
                        {
                            resource: 'Hydrogen',
                            buy: null,
                            sell: 1.0,
                        },
                    ],
                }
            ],
        }
    },
    methods: {
        priceLogSubmitted (priceLog) {
            this.priceLogs.push(priceLog)
        }
    }
}
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.css';

body {
    background-color: #202024;
}

</style>
