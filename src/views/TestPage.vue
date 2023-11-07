<template>
    <div class="page-main">
        <div class="abc">
            <h1>aaaaaaaaaaaa</h1>
            <SelectBox
                :type_select_box="'status-color'"
                :label="'status'"
                :selectedProps="currentSelected"
                :options="options"
                @ChangeValueSelectBox="filterDemo"
                @ChangeStatus="statusDemo"
            ></SelectBox>
            {{ 'value is:' + currentSelected.status }}
        </div>
    </div>
</template>

<script>
import SelectBox from '@/components/commons/SelectBox.vue'
export default {
    components: {
        SelectBox,
    },
    data() {
        return {
            currentSelected: { status: 'TODO', placeholder: 'Select' },
            options: [
                {
                    status: 'TODO',
                },
                {
                    status: 'DOING',
                },
                {
                    status: 'COMPLETE',
                },
            ],
        }
    },
    mounted() {},
    methods: {
        filterDemo(option) {
            this.currentSelected = option
        },
        statusDemo(selected, option) {
            const oldStatus = selected.status
            selected.status = option
            this.onChangeStatus(oldStatus, selected)
        },
        onChangeStatus(oldStatus, selected) {
            if (!selected.status) {
                return
            }
            const result = alert("Ban co muon thay doi tu " + oldStatus + " sang " + selected.status);
            this.currentSelected = selected;
        },
    },
}
</script>
<style lang="scss" scoped>
.page-main {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .abc {
        width: 200px;
        height: 400px;
        position: relative;
    }
    .row {
        display: flex;
        span {
            width: calc(100% / 4);
            display: flex;
            justify-content: center;
            align-content: center;
        }
    }
}
</style>
