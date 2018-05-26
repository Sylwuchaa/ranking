function RandomNumbers(selector) {
    Component.call(this, selector);
    this.numbers = [];
    this.rememberedNumbers = {};
}

RandomNumbers.prototype = Object.create(Component.prototype);
RandomNumbers.constructor = RandomNumbers;

RandomNumbers.prototype.init = function () {
    const self = this
    setInterval(function () {
        self.removeOldList();
        self.getData();
    }, 1000);
};

RandomNumbers.prototype.removeOldList = function () {
    const container = this.getDOMElement();
    container.innerHTML = '';
}

RandomNumbers.prototype.rememberNumbers = function () {
    const self = this
    const numbers = this.numbers;
    this.numbers.map(function (number) {
        if (self.rememberedNumbers[number.id]) {
            self.rememberedNumbers[number.id] += 1;
        } else {
            self.rememberedNumbers[number.id] = 1;
        }
    });

    console.log(this.rememberedNumbers);
}

RandomNumbers.prototype.getData = function () {
    const self = this;

    axios.get('http://localhost:3000/random-numbers')
        .then(function (response) {
            self.numbers = response.data.data.map(function (number) {
                return {
                    id: number
                }
            });
            self.rememberNumbers();
            self.sortNumbers();
            self.render();
        })
        .catch(function (error) {
            console.error(error);
        });
}

RandomNumbers.prototype.sortNumbers = function () {
    const rememberedNumbers = this.rememberedNumbers
    const numbers = this.numbers
    const self = this;
    this.numbers.sort(function (a, b) {
        return rememberedNumbers[b.id] - rememberedNumbers[a.id];

    })
}