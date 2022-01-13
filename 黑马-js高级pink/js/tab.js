window.addEventListener('load', function () {
    var that;

    class Tab {
        constructor(id) {
            that = this
            //获取元素
            this.main = document.querySelector(id)
            this.add = this.main.querySelector('.tabadd')
            //li的父元素
            this.ul = this.main.querySelector('.fisrstnav ul:first-child')
            //section的父元素

            this.fsection = this.main.querySelector('.tabscon')
            this.init()
        }

        init() {
            this.update()
            // init 初始化操作让相关元素绑定事件
            this.add.onclick = this.addTab;
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].index = i
                //切换功能
                this.lis[i].onclick = this.toggleTab
                // this.lis[i].children[1].onclick = this.removeTab;
                //删除功能
                this.remove[i].onclick = this.removeTab
                //双击编辑功能
                this.spans[i].ondblclick = this.editTab
            }
        }

        //获取页面li section
        update() {
            this.lis = this.main.querySelectorAll('li')
            this.sections = this.main.querySelectorAll('section')
            //X号的元素
            this.remove = this.main.querySelectorAll('.pac')
        //    获取span元素，first-child:获取第一个元素
            this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child')
        }

//    1,切换功能
        toggleTab() {
            // console.log(this.index)
            that.clearClass()
            this.className = 'liactive';
            that.sections[this.index].className = 'conactive'
        }

//    排他思想去除其他的样式
        clearClass() {
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].className = ''
                this.sections[i].className = ''
            }
        }

//    2,添加功能
        addTab() {
            that.clearClass()
            //    为了区分添加随机数
            var random = Math.random()
            //    1,创建li元素，section元素
            var li = '<li class="liactive"><span>Tab</span><p class="pac">x</p></li>'
            var section = '<section class="conactive">Tab:' + random + '</section>'
            //    2，追加到后面
            that.ul.insertAdjacentHTML('beforeend', li)
            that.fsection.insertAdjacentHTML('beforeend', section)
            that.init()
        }

//    3，删除功能
        removeTab(e) {
            e.stopPropagation()//阻止冒泡，放置触发li的点击事件
            var index = this.parentNode.index
            console.log(index)
            //根据索引号删除对应的li和section remove() 可以直接删除指定的元素
            that.lis[index].remove()
            that.sections[index].remove()
            that.init()//重新获取最新的元素个数
            //进行判断，如果我们要删除的不是选定状态的li 的时候，原来处于选中状态的li保持不变
            if (document.querySelector('.liactive')) return;
            //    当我们删除了选中状态的这个li，让他的前一个li元素处于选中状态
            index--;
            //    手动调用我们的点击事件，不需要鼠标触发
            //    添加判断条件，当前面小于0的时候已经为假了就不会再执行后面的条件了
            that.lis[index] && that.lis[index].click()
        }

//    4，修改功能
        editTab() {
            // 双击禁止选中文字
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            // alert('我草')
            this.innerHTML = '<input type="text"/>'
        }
    }

    new Tab('#tab');
})
