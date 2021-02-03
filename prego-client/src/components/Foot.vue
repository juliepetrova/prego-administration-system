<template>
    <footer class="bg-white">
        <div class="container mx-auto  px-8">

            <div class="w-full flex flex-col md:flex-row py-6">

                <div class="flex-1 mb-6">

                    <a class="text-orange-600 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"  href="#">
                        <!--Icon from: http://www.potlabicons.com/ -->
                        <img src="@/assets/img/Preg.png" width="86" alt="">

                    </a>
                </div>


                <div class="flex-1">
                    <p class="uppercase text-gray-500 md:mb-6">{{ $t('footer.links') }}</p>
                    <ul class="list-reset mb-6">
                        <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                            <a href="#" class="no-underline hover:underline text-gray-800 hover:text-orange-500">{{ $t('footer.faq') }}</a>
                        </li>
                        <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                            <a href="#" class="no-underline hover:underline text-gray-800 hover:text-orange-500">{{ $t('footer.help') }}</a>
                        </li>
                        <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                            <a href="#" class="no-underline hover:underline text-gray-800 hover:text-orange-500">{{ $t('footer.support') }}</a>
                        </li>
                    </ul>
                </div>
                <div class="flex-1">
                    <p class="uppercase text-gray-500 md:mb-6">{{ $t('footer.legal') }}</p>
                    <ul class="list-reset mb-6">
                      <router-link to="/termsandconditions">
                        <h2 class="mt-2 inline-block mr-2 md:block md:mr-0">{{ $t('footer.termsOfUse') }}</h2>
                      </router-link>
                        <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                            <a href="#" class="no-underline hover:underline text-gray-800 hover:text-orange-500">{{ $t('footer.privacy') }}</a>
                        </li>
                    </ul>
                </div>
                <div class="flex-1">
                    <p class="uppercase text-gray-500 md:mb-6">{{ $t('footer.social') }}</p>
                    <ul class="list-reset mb-6">
                        <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                            <a href="#" class="no-underline hover:underline text-gray-800 hover:text-orange-500">Facebook</a>
                        </li>
                        <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                            <a href="#" class="no-underline hover:underline text-gray-800 hover:text-orange-500">Linkedin</a>
                        </li>
                        <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                            <a href="#" class="no-underline hover:underline text-gray-800 hover:text-orange-500">Twitter</a>
                        </li>
                    </ul>
                </div>
                <div class="flex-1">
                    <p class="uppercase text-gray-500 md:mb-6">{{ $t('footer.company') }}</p>
                    <ul class="list-reset mb-6">
                        <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                            <a href="#" class="no-underline hover:underline text-gray-800 hover:text-orange-500">{{ $t('footer.officialBlog') }}</a>
                        </li>
                        <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                            <a href="#" class="no-underline hover:underline text-gray-800 hover:text-orange-500">{{ $t('footer.aboutUs') }}</a>
                        </li>
                        <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                            <a href="#" class="no-underline hover:underline text-gray-800 hover:text-orange-500">{{ $t('footer.contact') }}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "Foot"
    }
</script>

<style scoped>

</style>
