---
outline: deep
---

# 项目功能规避问题（老项目）

> 在后期开发安帮客项目功能，尽量考虑一下下面几个问题以及尽量避免问题的发生；也许可以提高你的开发效率, 不再为某个问题而烦恼；

**本来是有图片的，因为涉及公司内部项目，所以图片不会显示**

## 一、 弹框；

### 背景介绍

> **在提交完成数据， 修改数据之后 二次让用户进行确认操作，这步骤不仅繁琐，体验上造成了不适当；**

### 如何规避?

> 在非必要的情况下，减少页面中 `dialog.alert()` 的使用, 替换为 `dialog.msg()` ；
> `dialog.alert()` 是为了提醒客户接下来的操作会有影响，提醒该操作为`危险，警告`, 导致一些后果；
> `dialog.msg()` 仅仅是提示，我某一步操作完成了, 没必要告知客户`点击确认` 在进行操作；

## 二、 路由传参；

### 背景介绍

> **如果有这么几条数据要从 A 页面传到 B 页面，通过路由传参会导致页面打不开，报错的问题；**

### 如何规避?

#### 对于小数据，仅仅`单个参数`的情况；建议这样使用:

```js
dialog.window(
	"测试页面",
	"/app?id=" +
		id +
		"&type=" +
		type +
		"&orderType=" +
		orderType +
		"&orderId=" +
		orderId
);
```

#### 对于`数据大、多、杂`的情况；建议这样使用:

> 首先在 A 页面，即当前的页面， 封装一个方法 `getParams()`， 用来返回接口或者页面所需要的参数；

```js
function getParams() {
	return {
		id: $("input[name=id]").val(),
		type: $("input[name=type]").val(),
		orderType: $("input[name=orderType]").val(),
		orderId: $("input[name=orderId]").val(),
	};
}
```

> 其次，在 B 页面(即 A 页面的子页面中), 用变量或者结构接受 A 页面(父页面)的参数；**但是 A 页面(父页面)必须存在这个参数方法 **

```js
const parentParams = getParams && getParams();
console.log(parentParams.id);
// or
const { id, type, orderType, orderId } = getParams && getParams();
console.log(id);
// 接着你可以使用参数去进行下一步的操作;
```

#### 对于`数据大、多、杂`的情况；你还可以这样用:安帮客工具库中定义了全局的 `cache` 对象;

> 在 A 页面定义了一个数组，并将这个数组存在 缓存`cache`对象中

```js
cache.goods = [
	/**我这里好多数据*/
];
```

> 在 B 页面或者其他地方使用，**但是要注意，缓存对象的清空情况；**

```js
const goods = cache.goods;
```

## 三、 定义对象，`key` 作为数字，在页面中会导致顺序错乱；

### 背景介绍

> **写了以一个配置文件，根据配置文件渲染页面，但是想要吧 `key` 作为 `input 的 value`, 这是渲染页面会发生排序(从小到大)**

### 如何规避?

> 不以`数字或者字符数字`作为`key`; 将对象替换成数组模式即可；

```js
// 我要将全部放在页面的开头;
// 这个渲染页面会导致页面排序
const config = {
	autoDispatch: {
		value: { 1: "A", 2: "B", 3: "C", 4: "全部" },
	},
};
// 替换成这个
const config = {
	autoDispatch: {
		value: [{ 4: "全部" }, { 1: "A" }, { 2: "B" }, { 3: "C" }],
	},
};
```

## 四、 字符串模板；

### 背景介绍

> 表格渲染页面, 会有很多操作按钮以及展示情况；使用`字符串模板`可以减少 普通字符串的拼接；

### 如何规避?

```js
let str = "我这里是很长的代码, id是:" + id + "时间戳:" + time;
// 这样写简单明了
let str = `我这里是很长的代码, id是:${id}时间戳:${time}`;
```

## 五、 尽量使用工具库封装的方法；具体工具库有哪些工具, 请看 `安帮客工具库文档说明`;

### 背景介绍（这里只对保留俩位小数进行说明）

> 对于输入框，要限制输入小数，俩位小数。。。如果不使用封装的方法，十几个页面重复造轮子，来回复制粘贴，麻烦且不好维护；

### 如何规避?

```js
// 保留俩位小数 且不让输入符号 -
$("input[name=restrictFee]").on("input", function () {
	// 注意：该方法是工具库中封装的方法;
	decimalProcessing(this, data => {
		// 去掉 - 符号
		this.value = data.replace(/[^\d.]/g, "");
	});
});
```

## 六、公共页面或者组件，尽量使用 `类` 构造;

### 背景介绍

> 公共页面代码乱切多个变量重复使用，不好维护；

### 如何规避?

> 多次使用的变量 统一一个变量接收；
> 公共页面， 显示的页面一致，样式一致，参数也一致的情况；可以使用 `类(Class, prototype)` 进行构造，清晰明了；
> 可查看 `/admin/views/global/city/citySelect.html`

## 七、代码兼容问题考虑;

### 背景介绍

> 使用新语法， 导致浏览器不兼容；

### 如何规避?

> 使用之前 通过 [Can I Use](https://caniuse.com/) 网站，查询兼容性问题；
> 尽量使用兼容性较强的语法;

### 案例：

```js
const a = null,
	b = 100;
const obj = {
	next: {
		value: 2,
		next: null,
	},
};
// 兼容性较差, 建议使用 || 替换
a ?? b; // 替换  a || b;
// 兼容性较差, 建议使用三元 替换
// 替换为 obj.next ? obj.next.value : null; 或者 obj.next && obj.next.value
obj.next?.value;
```

## 八、同页面多次使用方法，建议封装;

### 背景介绍

> A 页面有多个操作按钮，如：编辑，添加，日志。。。显示 `dialog.window()`，每个按钮基本会显示，这是要考虑二次封装；

### 如何规避?

```js
// 二次封装 dialog.window()
function dialogWindow({ ...ags }) {
	if (JSON.stringify(ags) === "{}") throw new Error("参数：标题和链接必传");
	if (!ags.title || !ags.url) throw new Error("标题和链接不能为空");
	dialog.window(ags.title, ags.url, ags.params, ags.area);
}
```

### 如何使用(案例)?

```js
// 查看日志
function log(id) {
	dialogWindow({
		title: "配置日志",
		url: "/user/proportion/log?id=" + id + "",
		params: "",
		area: ["70%", "60%"],
	});
}
```

## 九、对于使用次数较少，代码量较多，可以写单独 js 文件；

### 背景介绍

> 例如下图地址过滤， 支持键盘上下切换， 功能较为复杂，失去焦点，聚焦，回车等等展现不同的状态， 这样的代码量庞大，可以使用`类`开发，单独出一个 `js`文件；在`views/common/js.ejs`文件中引入

### 如何规避?

> 这样引入的代码仅一行，如后期有扩展型的需求，可在`js`文件中更改；

```js
new InitSearchCities();
```

## 十、注解；

### 背景介绍

> 不少页面中，代码没有注解，修复哪些问题。。。阅读起来较不方便，浪费时间；没有效率；

### 如何规避?

> 重要逻辑或者公共组件，尽量添加注解，如这行代码我避免了那些问题；
> 或者这行代码我解决的是什么? 修复的是什么?
> 添加注解之后，如后期开发/更新迭代，更加明白这样写的作用；
> 避免注解的冗余性；

## 十一、样式问题；

### 背景介绍

> 过多的行内样式导致的代码杂乱无章

### 问题样例

> **同样的样式代码, 同样的颜色! 重复复制粘贴；** >

### 如何规避?

> 一直的样式或者颜色可以写一个统一的 样式类，这样直接使用即可；
> 非必要的情况，减少使用行内样式；

### 案例:

```css
.abk-puple {
  background-color: puple;
  color: #ffffff;
}
```

```html
<button class="abk-puple">查看</button> <button class="abk-puple">编辑</button>
```

## 十二、abkTable 组件 value 为 0 的情况渲染异常；

### 背景介绍

> 表格组件 接口中 value 值为 0 的情况，页面中渲染不出来；

### 异常描述

> 例如下图： full.orderCount 是个数字 0

### 解决方案：

```js
// 方案一: override写法， 字符串拼接
{
    override: function(data,  full){
        return '' + full.orderCount;
    }
}
// 方案二:  "data"是固定的，"orderCount"是渲染的字段名
{"data" : "orderCount"}


// override 用法背景: 在展示该字段的情况下，还要展示其他信息
// {"data" : "orderCount"}  仅仅展示该字段的信息
```

## 十三、列表数据操作完成之后, 仅仅刷新表格数据, 不去刷新页面

### 背景介绍

> 第三页 第三条数据我修改之后，提示 修改成功, 1s 后刷新了页面， 这时还想继续操作；又得重新切换第三页找到第三条数据；

### 解决方案：

```js
// 尽量使用 cache.abkTable.ref()
dialog.msg("删除成功", { icon: 1, time: 1300 }, function () {
	// 如果是当前页面使用： cache.abkTable.ref()
	// 父子关系的页面使用： parent.cache.abkTable.ref();
	parent.cache.abkTable.ref();
});
```

## 十四、后续功能开发，遇到新页面 `dialog.window()` 写法需注意

### 背景介绍

> 点击按钮, 会弹出一个页面, 这时键盘按下回车键，还会弹出一个窗口，看下图：

> 点击按钮提交数据, 首次点击之后， 不做任何操作，这时按下键盘 数据会一直请求， 一直提交；**`批量操作`按钮时特别注意；**

### 涉及到的地方;

> `按钮提交数据`, `按钮打开新页面`

### 如何避免；

> 针对于`dialog.window()` 打开新的页面的情况，适用于下面:

```js
// 例如 （按钮A， A的ID为'button-a'）
dialog.window("测试页面", "/test/router", "", "", function () {
	// 打开页面成功之后, 被点击的按钮失去焦点;
	$("#button-a").blur();
});
```

> 针对于按钮 提交数据的情况，适用于下面：

```js
// 例如 （按钮A， A的ID为'button-a'）要提交数据


// function 方式
function postData () {
  // 优化
  $('#button-a').blur();
  http.post('/post/json', {}, function () {
    // $('#button-a').blur();
    ...code
  }, function () {
    // $('#button-a').blur();
    ...code
  })
}


// click 方式
$('#button-a').click(function () {
  $('#button-a').blur();
  ... code
})
```

## 十五、查看备注(其他字符串，操作内容...)，点不开的情况;

### 背景介绍

> 开发中 特别注意这样的情况， 添加备注的时候 加了回车换行， 但是查看备注的时候查看不了；

### bug 重现： (大多数都是这样的情况)

### 如何避免；

- 可以点击备注前，将字符串中间的换行去掉;

```js
let remark = remark.replace(/\s\r\n/g, "");
```

- 添加备注的情况， 禁止换行(根据场景而定)
- ** #990000 (推荐使用)：** #cc0000 使用自定义属性， 就算有空白回车字符, 使用自定义属性 也不会显示; 如下代码:

```html
<td>
	 
	<p class="textHidden"><%=item.remark%></p>
	  <a data-remark="<%=item.remark%>" onclick="showRemark(this)">查看</a>
</td>
```

```js
function showRemark(_this) {
	// 这里的remark 就是 demo元素中自定义属性;
	let remark = $(_this).attr("data-remark");
	console.log(remark);
}
```

## 十六、Node 作为中间路由, 访问 Api 接口 尽量渲染 #9900ff error 页面;

### 背景介绍

在页面有报错(开小差， 没有权限)的情况下， 页面可以正常打开，但是没有任何内容，#3d85c6 **体验上造成错觉；页面进去了,没有内容, 功能没有实现嘛?**

### 问题重现:

```js
router.get("/checkDraftBoxCouponsByDetailsId", function (req, res, next) {
	abkServer.get("/v1/order/goods/checkDraftBoxCoupons", req, function (data) {
		// 特别注意: 如果接口开小差, 页面正常打开, 没有数据; 不能明确确定是没有数据还是接口返回问题;
		res.render("/xxx", { data: data.context });
	});
});
```

**建议: 判断接口返回成功渲染页面， 报错开小差的情况下 渲染错误页面。 如: 408 xxxxx, 没有权限, 系统开小差**

```js
router.get("/checkDraftBoxCouponsByDetailsId", function (req, res, next) {
	abkServer.get("/v1/order/goods/checkDraftBoxCoupons", req, function (data) {
		if (data.success) {
			res.render("/xxx", { data: data.context });
		} else {
			Utils.renderError(res, data);
		}
	});
});
```

> 这样直观明了。可以看出是什么问题了，不至于打开页面什么也不显示(显示异常)的情况;

## 十七 功能优化方面

### 注解，功能扩展；

> 单页面的功能也许并不复杂， 但是逻辑代码为考虑到封装以及扩展； 导致页面卡顿， 等待时间长；

一个功能不是为了完成而完成， 在做功能之前是否应该想到该功能封装性以及扩展性(时间紧急除外)；多次引入相同或者类似的是否考虑封装；

注释的功能或者代码尽量标明 注解内容， 当初是因为什么原因注释了代码， 不然会对后期维护造成一定难度；

### 页面性能以及美化度 可查看`前端优化方案`

> 页面的性能加载速度，避免内存的泄露，导致页面卡顿；
> 按钮尽量统一大小；

## 十八 父级页面刷新问题

### 场景介绍

子页面有弹框，子页面的确认按钮点击之后要刷新父级页面的表格或者页面；

### 场景一

子页面刷新父级页面， 如父级页面没有表格，或者不是分页表格， 就是单独刷新页面， 重新刷新数据；

```js
parent.location.reload();
```

### 场景二

子页面刷新父级页面， 如父级页面有表格并且是分页表格的情况；

```js
parent.cache.abkTable.ref();
```

**切記：有几个 `window.open()` 弹框， 就要写几个 `parent`; 如: `parent.parent.location.reload();`**

## 十九 函数频繁调用， 频繁请求优化

### 场景介绍

- 有这么一个需求，`搜索地址或者类似京东淘宝搜索商品`的功能，输入框输入文字自动调用接口请求数据，实现数据查询；
- 按钮点击提交数据，当请求还在`Loading`中， 再次点击，出现重复俩次提交，`如充值扣款的情况下就会出现严重的问题；`;

### 场景一

如果， 每次输入一个字符就会查询一次接口，也会查询一次数据库，频繁请求会导致服务器和数据库的压力倍增；

#### 解决最佳方案就是 `函数节流`, 每隔一段时间调用一次接口；减少服务器的压力；

### 场景二

如果在按钮重复提交数据， 如充值扣款，在后端没有进行判断的情况就会导致用户钱包重复充值；这算是 T0 级别的 bug 了；

#### 解决方案：（根据实际业务场景选择适用）

- 在点击按钮之后，将按钮禁止点击，在`Loading`中用户无法点击，在`PromiseSuccess`成功回调 将按钮恢复即可；
- `函数防抖`， 在 n 秒内重复点击只会提交一次

## 二十 订单列表 tab 添加新状态

如果，订单列表添加新的 tab 订单状态之后，点击`订单详情` 会出现以下报错

> 注意的是：该报错说明添加的元素找不到;

### 解决方案：

- 这时你需要查看对应的`details_template.html` 中元素是否规范，
- 规范的情况，请检查元素标签是否闭合。
- 是否添加`td`显示列数的判断，因为每个订单状态的详情页对应的表格列数是不一致的，如果不添加判断， 如下图

会发现， 只有结束标签`td` ，又因为开始标签`td` 因为 没有添加判断， 导致元素未渲染；写法不规范导致的元素渲染异常报错；

## 二十一 文件上传样式过多，不统一

> 项目中现有附件，图片上传功能以及样式过于重复且使用不统一，原有的上传方式未做到功能的完善以及扩展 ；现已将上传重新做了功能处理完善，【支持拖拽, 多文件, 粘贴上传，文件大小限制，自定义样式， 图片压缩】
> 新文件的上传方式可以参考，具体用法可参考页面案例； 【切记：Front-end tools 标签页仅在开发环境才会显示 】

## 二十二 对于金额的处理方式[currency]， [官方文档](https://currency.js.org/)

> 项目中的订单金额，提现以及充值等等关于金额的显示以及处理方式，可用三方方案解决；

- [x] 对金额的处理方式，保留俩位小数
- [x] 特使情况可显示 `$`符号或者自定义符号显示；
- [x] 可解决精度丢失

可参考以下用法：

```JS
currency("100123").toString() // 100123.00
currency("100123").format() // $100,123.00
// 精度计算
currency(.2).add(.1).toString() // 0.30
currency(.2).add(.1).value // 0.3


const USD = value => currency(value);
const JPY = value => currency(value, { precision: 0, symbol: '¥' });
const EURO = value => currency(value, { symbol: '€', decimal: ',', separator: '.' });
USD(1234.567).format(); // => "$1,234.57"
JPY(1234.567).format(); // => "¥1,235"
EURO(1234.567).format(); // => "€1.234,57"
```

## 二十三： 对于输入框 input 搜索问题异常；可参考 [input 中文搜索异常](https://www.tapd.cn/59234416/markdown_wikis/show/#1159234416001000193)

## 二十四：重复的请求，避免所有弹框闪烁消失｛已优化｝ [后台系统下单（多业主重复单的情况）出现的功能异常](https://www.tapd.cn/59234416/markdown_wikis/show/#1159234416001000194)
