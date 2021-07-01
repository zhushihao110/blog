## 选择器：CSS 选择器是 CSS 规则的一部分，用于匹配文档中的元素。匹配的元素将会拥有规则指定的样式
**优先级：****!important****> 内联 > ID > 类，****属性选择器，****伪类**** > 标签，****伪元素**
### 基础选择器

- 标签选择器： 元素 {_样式声明_ }
- 类选择器: .类名 {_样式声明_ }
- ID选择器: #id属性值 {样式声明 }
- 通配选择器: 一个星号(`*`)就是一个通配选择器.它可以匹配任意类型的HTML元素
- 属性选择器: **属性选择器**通过已经存在的属性名或属性值匹配元素  可匹配具体属性值
```css
/* 存在title属性的<a> 元素 */
a[title] {
  color: purple;
}

/* 存在href属性并且属性值匹配"https://example.org"的<a> 元素 */
a[href="https://example.org"] {
  color: green;
}

/* 存在href属性并且属性值包含"example"的<a> 元素 */
a[href*="example"] {
  font-size: 2em;
}

/* 存在href属性并且属性值结尾是".org"的<a> 元素 */
a[href$=".org"] {
  font-style: italic;
}

/* 存在class属性并且属性值包含以空格分隔的"logo"的<a>元素 */
a[class~="logo"] {
  padding: 2px;
}
```
### **选择器列表**（`,`）

- 常被称为并集选择器或并集组合器，选择所有能被列表中的任意一个选择器选中的节点
- 语法：element, element, element { _style properties_ }
- 在选择器列表中如果有一个选择器不被支持，那么整条规则都会失效
- 解决这个问题的一个方法是使用 [`:is()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:is) 选择器，它会忽视它的参数列表中失效的选择器，但是由于 [`:is()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:is)  会影响优先级的计算方式，这么做的代价是，其中的所有选择器都会拥有相同的优先级
- former_element + target_element { _style properties_ }
```css
span, div {
  border: red 2px solid;
}
```
### 关系选择器

- **相邻兄弟选择器：相邻兄弟选择器** (`+`) 介于两个选择器之间，当第二个元素_紧跟在_第一个元素之后，并且两个元素都是属于同一个父[`元素`](https://developer.mozilla.org/zh-CN/docs/Web/API/%E5%85%83%E7%B4%A0)的子元素，则第二个元素将被选中
```css
/* 图片后面紧跟着的段落将被选中 */
img + p {
  font-style: bold;
}
```

- **通用兄弟选择器**：兄弟选择符，位置无须紧邻，只须同层级，`A~B` 选择`A`元素之后所有同层级`B`元素former_element ~ target_element { _style properties_ }
- **子选择器**：当使用  > 选择符分隔两个元素时,它只会匹配那些作为第一个元素的**直接后代**(子元素)的第二元素元素1 > 元素2 {_样式声明_ }
- **后代选择器**：当使用 `␣` 选择符 (这里代表一个空格,更确切的说是一个或多个的空白字符) 连接两个元素时使得该选择器可以只匹配那些由第一个元素作为祖先元素的所有第二个元素(后代元素) 
### 伪选择器

- 伪类选择器：: 伪选择器支持按照未被包含在文档树中的状态信息来选择元素。CSS **伪类** 是添加到选择器的关键字，指定要选择的元素的特殊状态。例如，[`:hover`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:hover) 可被用于在用户将鼠标悬停在按钮上时改变按钮的颜色
```cpp
/* 所有用户指针悬停的按钮 */
button:hover {
  color: blue;
}
```

- 伪元素： :: 伪选择器用于表示无法用 HTML 语义表达的实体。:: 伪选择器用于表示无法用 HTML 语义表达的实体。例子：p::first-line 匹配所有 元素的第一行，伪元素是一个附加至选择器末的关键词，允许你对被选择元素的特定部分修改样式。下例中的 [`::first-line`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::first-line) 伪元素可改变段落首行文字的样式
```css
/* 每一个 <p> 元素的第一行。 */
p::first-line {
  color: blue;
  text-transform: uppercase;
}
```
