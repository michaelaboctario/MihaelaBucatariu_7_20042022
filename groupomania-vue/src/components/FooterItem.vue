<template>
    <footer id="footer" class="footer">
        <div>
            <ul class="footer-links">
                <li class="footer-links-item">
                    <a href="https://www.facebook.com/" title="Suivez-nous sur Facebook" rel="external" target="_blank" 
                        aria-label="le compte Facebook de Groupomania">
                        <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'facebook' }" class="footer-fa-icon"/>
                    </a>
                </li>
                <li class="footer-links-item">
                    <a href="https://www.instagram.com/" title="Suivez-nous sur Instagram" rel="external" target="_blank" 
                        aria-label="le compte Instagram de Groupomania">
                        <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'instagram' }" class="footer-fa-icon"/>
                    </a>
                </li>
                <li class="footer-links-item">
                    <a href="https://twitter.com/" title="Suivez-nous sur Twitter" rel="external" target="_blank" 
                        aria-label="le compte Twitter de Groupomania" >
                        <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'twitter' }" class="footer-fa-icon"/>
                    </a>
                </li>
                <li class="footer-links-item">
                    <a href="mailto:groupomania-support@gmail.com" title="Nous contactez" rel="external" target="_blank" 
                        aria-label="le contact par email de Groupomania">
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

<style scoped>

    .footer {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    .footer div {
        align-items: center;
    }

    .footer-fa-icon {
        width: 68px;
        height: 68px;
    }

    .footer-fa-icon:hover {
        cursor: pointer;
    }
        
    .footer-links {
        display: flex;
        justify-content: space-between;
        list-style: none;
        gap: 18px;
    }

    .footer-fa-icon {
        transition: all 200ms;
    }

    .footer-fa-icon:hover {
        transform: scale(1.09);
        text-shadow: 3px 3px 5px #122442;
    }

    @media screen and (max-width: 768px) {
        .footer {
            display: flex;
            justify-content: center;
            margin-top: 10px;
        }
        .footer-fa-icon {
            width: 48px;
            height: 48px;
        }
        .footer-links {
            gap: 12px;
        }
    }

</style>