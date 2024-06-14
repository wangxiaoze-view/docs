---
outline: deep
---

# 工具文档（老项目）

> 项目中常用的 工具库集合。 dialog 工具库弹框   基于  layer  二次封装方法, 如又遇到   扩展性的功能或者方法，请参考  layui 框架官网  ;

## **调用 layer 时间控件**!!

**1. 时分秒 YYYY-MM-DD hh:mm:ss**

```html
<input data-type="datetime" />
```

**2. 日期 YYYY-MM-DD**

```html
<input data-type="date" />
```

## **input 类型**!!

**1. float**

```html
<input input-data="float" />
```

**2.number**

```html
<input input-data="number" />
```

**3. minus-float 可输入负数的 float**

```html
<input input-data="minus-float" />
```

**4. 正整数**

```html
<input input-data="positive-integer" />
```

**5. input, textarea 已做了空格处理**

```js
$("input").blur(function () {
	this.value = this.value.trim();
	this.value = this.value.replace("\n", "");
});
$("textarea").blur(function () {
	this.value = this.value.trim();
	this.value = this.value.trim();
	this.value = this.value.replace("\n", "");
});
```

**6.排除特殊符号**

```javascript
// 如何使用?
// <input type="text" oninput="cleanSpelChar(this)"/>
function cleanSpelChar(th) {
	if (/[^\u4e00-\u9fa5a-zA-Z0-9-#,，。；;\s']/.test(th.value)) {
		$(th).val(th.value.replace(/[^\u4e00-\u9fa5a-zA-Z0-9-#,，。；;\s']/, ""));
	}
}
```

**7.小数处理 保留俩位小数**

```html
<input type="text" oninput="decimalProcessing(this, callBack)" />
```

**8.textarea 排除特殊符号**

```html
<textarea filter></textarea>
```

## **发送验证码**

```html
<!-- button的ID 是固定的getCode, phone 和 code 有对应的ID  -->
<input id="phone" />
<input id="code" />
<button id="getCode" phone="phone" code="code">发送验证码</button>
```

## **日期扩展**

```js
new Date().format(format);
```

## **cookie**

1. **设置**

```js
Cookie.set(key, value, day);
```

2. **读取**

```js
Cookie.get(key);
```

3.**删除**

```js
Cookie.remove(key);
```

## **数字类型扩展**

1.**分转元**

```js
Number.moneyYuan();
```

2. **元转分**

```js
Number.moneyFen();
```

3.**时间戳转日期 YYYY-MM-DD**

```js
Number.formatDate();
```

4.**时间戳转时间 hh:mm:ss**

```js
Number.formatTime();
```

5.**时间戳转时间 YYYY-MM-DD hh:mm:ss**

```js
Number.formatDatetime();
```

## **字符串类型扩展**

1. **字符转 float**

```js
String.toFloat();
```

2.**字符串替换**

```js
String.myReplace("要替换的字符", "想要替换成的字符");
```

## **dialog 弹框**

**1.关闭**

```js
// 关闭所有弹框
dialog.closeAll(name);
// 关闭单个弹框. 适用于 tips的关闭
dialog.closse(index);
```

**2.alert**

```js
dialog.alert(text, success);
```

**3.window**

```js
// options参数说明
// shadeClose: 是否点击遮罩关闭 boolean
// shade:  遮罩 默认 0.3
// area: 宽高  默认 auto
// maxmin: 最大最小化  默认 true

// type: 0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层
// window 的type 是 2
dialog.window(title, url, options, (area = ["85%", "85%"]));
```

**4. confirm**

```js
// btns: ['按钮1', '按钮2']
// btn1, btn2 多按钮的回调
dialog.confirm(title, btns, btn1, btn2);
```

**5. loading**

```js
doalog.loading();
```

**6.msg**

```js
// option参数说明
// time: 关闭的时间
dialog.msg(title, option, callback);
```

**7. prompt**

```js
// formType: 输入框类型，支持0（文本）默认1（密码）2（多行文本）默认为2
dialog.prompt(title, formType, success);
```

**8.tips**

```js
/**
 * @param content       必填, 显示文本的内容
 * @param self          必填, 显示的元素, 及当前的元素
 * @param direction     默认下, 显示的方向， 上右下左(1,2,3,4)
 * @param background    默认白色, 显示的背景颜色
 * @param maxWidth      最大宽度设置  默认 360   只有当area: auto时，maxWidth的设定才有效。
 * @param maxHeight     最大高度设置  只有当高度自适应时，maxHeight的设定才有效
 * @param tipsMore      是否允许多个tip  默认false
 * @param area          区域设置
 * @param time          默认为0, 显示的时间
 * @param skin          默认自己的皮肤, 显示的皮肤名称
 * @param style         默认自己的皮肤样式, 显示自定义的皮肤样式
 */
dialog.msg({
	content: "",
	self: "",
	direction: 3,
	background: "",
	maxWidth: 360,
	maxHeight: 0,
	tipsMore: false,
	area: "auto",
	time: "",
	skin: "",
	style: "",
});
```

## 使用方法及场景

> 鼠标移入 'xxx' 文案，弹出 'tips' 显示其他信息；鼠标移除 关闭;

### 实例代码

```js
let tipsIndex = null;
$("div.show-masters").on("mouseover mouseout", function (e) {
	let type = e.type;
	if (type === "mouseover") {
		tipsIndex = dialog.tips({
			content: "测试师傅拒单",
			self: this,
			direction: 1,
			background: "#3595CC",
		});
	} else if (type === "mouseout") {
		dialog.close(tipsIndex);
	}
});
```

## **正则校验**

**1. number**

```js
// 这里的obj是对象, 如 {value: 123}
// 或者 页面中这么使用
// <input oninput="valid.number(this)"/>

// 方法中 获取的是 obj.value
valid.number(obj);
```

**2.float**

```js
valid.float(obj);
```

**3. minusFloat 可输入负值**

```js
valid.minusFloat(obj);
```

**4.positiveInteger 正整数**

```js
valid.positiveInteger(obj);
```

## **加减乘除**

**1.加**

```js
floatObj.add(a, b);
```

**2. 减**

```js
floatObj.subtract(a, b);
```

**3. 乘**

```js
floatObj.multiply(a, b);
```

**4.除**

```js
floatObj.divide(a, b);
```

## **时间**

1. **获取当前时间**

```js
// yyyy-mm-dd hh:mm
const time = getMonthYestdy();
```

2. **返回 x 月前时间 **

```js
// 返回3个月前的时间
const time = getNumMonthYestdy(3);
```

## **是否是手机号**!!

```js
const is = isPoneAvailable("xxxx");
```

## **支持粘贴上传**!!

> 需要注意的地方: 如果 `ID` 有值的情况, 会`显示默认的样式` 想要`自定义样式, id设置为空`即可。
> 默认删除事件为 `双击 即可删除`。

```js
/**
 * @param id       		目标id, 非必填
 * @param successCallBack          成功的回调
 * @param errorCallBack 		   失败的回调
 */
pasteUpload(id, successCallBack, errorCallBack);
```

## **图片压缩**!!

> 适用于图片上传前，做压缩处理

1. **清晰 体积比下面的大一些**

```js
// file: 文件  quality：清晰度
compressImg(file, quality).then(res => {
	// 这里的file 就是res 返回的对象
	const file = {
		file: miniFile,
		origin: file,
		beforeSrc: src,
		afterSrc: canvasURL,
		beforeKB: Number((file.size / 1024).toFixed(2)),
		afterKB: Number((miniFile.size / 1024).toFixed(2)),
	};
});
```

2. **较清晰，有一丢丢模糊，体积小**

```js
// file: 文件  quality：清晰度
compressImgOptimization(file, quality).then(res => {
	// 这里的file 就是res 返回的对象
	const file = {
		file: miniFile,
		origin: file,
		beforeSrc: src,
		afterSrc: canvasURL,
		beforeKB: Number((file.size / 1024).toFixed(2)),
		afterKB: Number((miniFile.size / 1024).toFixed(2)),
	};
});
```

## **fn 扩展插件**!!

1. **城市**

```js
$("#city").city();
```

**2. action**

```js
$(".action").action(option, success, error);
```

**3. page**

```js
$(".page").page(success);
```

**4. abkTable**

```js
$(".page").abkTable(option, success, working);
```

**5. table**

```js
$(".page").table(columns, parentCallback);
```

**6. upload**

```js
// option.isMultiple: true 启动图片压缩, false: 不压缩; 默认压缩
$(".page").upload(option);
```

**7. uploadFile**

```js
// limitFileSize 可以限制文件的大小, 默认10MB
$(".page").uploadFile(option);
```

**8. customUpload 自定义上传**

```js
/**
let fileOption = {
  // form type  固定值
  formFile: 'file',
  // 校验文件名包含特殊符号, 默认校验文件名
  // 是否校验特殊符号
  isSpecialSymbols: options.isSpecialSymbols || true,
  specialSymbolsTypes: options.specialSymbolsTypes || ['.', '@', '!', ',', '，', '。'],
  // 声明文件类型类型， 图片还是文件  图片是photo  文件是 file
  type: options.type || 'file',
  // 限制最大上传数量， 默认显示四张
  maxFileCount:  options.maxFileCount || 4,
  // 文件名称, 传过来的文件名称, 自定义文件名
  fileName:  options.fileName || '',
}
*/
$(".page").customUpload(option);
```

## **显示文件大小**!!

> 适用于文件列表，展示文件大小的情况

```js
formatFileSize(`fileSize`);
```

## **解决精度丢失**!!

```js
// 计算机计算出的0.1 + 0.2 约等于0.3
fixAccuracy(0.1 + 0.2); // 0.3
```

#### **图片缩略图**!!

> 针对于添加活动，订单详情，使用图片的场景， 可解决图片加载缓慢的问题; 在一些列表较大的情况下尽可能的使用缩略图

```js
/**
 * @description 展示图片的缩略图
 * @param imageSrc    图片的路径;
 */
getThumbnailStr(imageSrc);
```
