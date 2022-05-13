<template>
    <footer id="footer" class="footer">
        <div>
            <ul class="footer-links">
                <li class="footer-links-item">
                    <a href="https://www.facebook.com/" title="Suivez-nous sur Facebook">
                        <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'facebook' }" class="footer-fa-icon"/>
                    </a>
                </li>
                <li class="footer-links-item">
                    <a href="https://www.instagram.com/" title="Suivez-nous sur Instagram">
                        <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'instagram' }" class="footer-fa-icon"/>
                    </a>
                </li>
                <li class="footer-links-item">
                    <a href="https://twitter.com/" title="Suivez-nous sur Twitter">
                        <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'twitter' }" class="footer-fa-icon"/>
                    </a>
                </li>
                <li class="footer-links-item">
                    <a href="mailto:groupomania-support@gmail.com" title="Nous contactez">
                        <font-awesome-icon :icon="{ prefix: 'fas', iconName: 'envelope' }" class="footer-fa-icon"/>
                    </a>
                </li>
            </ul> 
        </div>
    </footer>
</template>

<script>
export default {
    name: 'FooterItem',
}
</script>

<style lang="scss">

.footer {
    display: flex;
    justify-content: center;
    min-width: 480px;
    margin-top: 30px;
    & div {
        align-items: center;
    }
    &-fa-icon {
        width: 60px;
        height: 60px;
        &:hover {
            cursor: pointer;
        }
    }
    &-links {
        display: flex;
        justify-content: space-between;
        list-style: none;
        gap: 30px;
        &-item {
            & a.footer-fa-icon {
                font-size: 30px;
                color: white;
                transition: all 400ms;
                &:hover {
                    transform: scale(1.2);
                    text-shadow: 3px 3px 5px #122442;
                }
            }
        }
    }
}
</style>