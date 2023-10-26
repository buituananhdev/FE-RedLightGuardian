<template>
    <div name="modal">
        <div class="modal-mask">
            <div class="modal-mask" role="dialog" aria-modal="true" aria-hidden="true" tabindex="-1">
                <div @click="closeModal" class="modal-container-x" :class="{ bgblur: bgblur }">
                    <slot></slot>
                </div>
            </div>
        </div>

        <notifications
            group="fullmodal"
            position="top right"
            :duration="5000"
            animation-type="velocity"
            :max="2"
            :ignore-duplicates="true"
        />
    </div>
</template>

<script>
export default {
    props: {
        bgblur: Boolean,
    },
    beforeUnmount() {
        document.body.classList.remove('no-scroll')
    },
    methods: {
        closeModal() {
            this.$emit('close-modal')
        },
    },
    mounted() {
        addEventListener('keyup', (e) => {
            if (e.keyCode === 27) {
                this.$emit('close-modal')
            }
        })
        document.body.classList.add('no-scroll')
    },
}
</script>

<style scope>
.modal-mask {
    position: fixed;
    z-index: 10000;
    top: 0;
    left: 0;
    background-color: #000000b2 !important;
}

@supports (-webkit-touch-callout: none) {
    .modal-mask {
        max-height: none !important;
        height: 101% !important;
        overflow-y: scroll !important;
        /*  Ensure that the modal is scroll-able */
        -webkit-overflow-scrolling: touch !important;
        /* Avoid having to use 2 finger scroll on iOS    */
    }
}

.modal-container-x {
    width: 100%;
    width: 100vw;
    height: 100%;
    height: 100vh;
    transition: all 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(0deg, rgba(163, 174, 208, 0.8) 0%, rgba(163, 174, 208, 0.8) 100%);
    cursor: pointer;
}

.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
.bgblur {
    background: rgba(163, 174, 208, 1);
}
</style>
