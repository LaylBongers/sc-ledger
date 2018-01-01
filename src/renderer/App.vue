<template>
<div id="app">
    <div class="container-fluid text-light">
        <div class="row">
            <div class="col-12 col-md-6">
                <SearchRoutes class="mt-3" />
            </div>

            <div class="col-12 col-md-6">
                <AddPriceLog class="mt-3"
                    :locations="locations"
                    @submitted="priceLogSubmitted"
                />
                <ViewLocation class="mt-3" :locations="locations" />
            </div>

            <div class="col-12">
                <PriceLogs :price-logs="priceLogs" />
            </div>
        </div>
    </div>
</div>
</template>

<script>
import AddPriceLog from './AddPriceLog'
import PriceLogs from './PriceLogs'
import SearchRoutes from './SearchRoutes'
import ViewLocation from './ViewLocation'

export default {
    name: 'sc-ledger',
    components: {
        AddPriceLog,
        PriceLogs,
        SearchRoutes,
        ViewLocation,
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
            locations: [
                'Port Olisar',
                'Grim HEX',
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
