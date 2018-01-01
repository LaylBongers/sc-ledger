<template>
<div id="app">
    <div class="container-fluid text-light">
        <div class="row">
            <div class="col-12 col-md-6">
                <SearchRoutes class="mt-3" />
            </div>

            <div class="col-12 col-md-6">
                <LogPrice class="mt-3" :locations="locations" :resources="resources" />
                <ViewLocation class="mt-3 mb-3" :locations="locations" />
            </div>
        </div>
    </div>
</div>
</template>

<script>
import LogPrice from './LogPrice'
import SearchRoutes from './SearchRoutes'
import ViewLocation from './ViewLocation'

export default {
    name: 'sc-ledger',
    components: {
        LogPrice,
        SearchRoutes,
        ViewLocation,
    },
    data () {
        return {
            priceLogs: [],
            locations: {
                'Port Olisar': {
                    priceChanges: [
                        {
                            timestamp: new Date(),
                            resource: 'Hydrogen',
                            buy: 0.8,
                            sell: null,
                        },
                    ],
                },
                'Grim HEX': {
                    priceChanges: [
                        {
                            timestamp: new Date(),
                            resource: 'Hydrogen',
                            buy: null,
                            sell: 1.0,
                        },
                    ],
                },
            },
            resources: ['Hydrogen', 'Iodine'],
        }
    },
}
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.css';

body {
    background-color: #202024;
}
</style>
