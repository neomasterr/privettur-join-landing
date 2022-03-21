class Select extends jcore.Select {
    select(index) {
        this.change({
            target: this.$itemList.get(index),
        });
    }
}

export default Select;
