<template>
    <div class="col-3">
        <VideoItemMenu />
        <ThemeItemMenu />
    </div>
</template>

<script>
    import VideoItemMenu from "./VideoItemsMenu/VideoItemMenu";
    import ThemeItemMenu from "./ThemeItemMenu/ThemeItemMenu";

    export default {
        name: "Aside",
        data() {
            return {

            }
        },
        components: {
            VideoItemMenu,
            ThemeItemMenu
        }
    }
</script>

<style scoped>

</style>