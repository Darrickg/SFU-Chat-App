<!--
    Show course info stored in local db or pulled from external API
-->
<template>
    <button @click="display_course_info=!display_course_info" class="absolute right-0 hover:text-sfu-dark-red hover:bg-white m-1">Course Info</button>
    <br>
    <section v-if="display_course_info" class="absolute right-0 max-w-sm">
        <h2>{{ title }}: {{ section }}</h2>
        <p class="text-left">{{ description }}</p>
    </section>
</template>

<script>
export default {
    name: 'CourseInfo',
    setup() {
        const title = "Web II - Server-side Development";
        const section = "D100";
        const description = "Introduces students to the fundamentals of server-side web development. Students will "
            + "gain experience working with backend web frameworks, designing and implementing web APIs, and deploying "
            + "web systems. Students will be introduced to popular back-end frameworks. The course will focus on the "
            + "design, creating, implementation, and deployment of backend systems, including APIs.";
        return { title, section, description };
    },
    data() {
        let display_course_info=false;
        return { display_course_info };
    },
    props: {

    }
}
</script>
<style scoped>

</style>
