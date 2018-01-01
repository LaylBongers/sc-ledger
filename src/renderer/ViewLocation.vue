<template>
<div class="card bg-dark">
    <h3 class="card-header">View Location</h3>
    <div class="card-body">
        <select class="form-control">
            <option v-for="location in locations" :value="location">{{ location }}</option>
        </select>
    </div>
</div>
</template>

<script>
export default {
    name: 'search-routes',
    props: ['locations'],
}
</script>

<style>
</style>
