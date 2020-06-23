//--------------------------------------------------
// 顯示文件的樹狀結構
//--------------------------------------------------
function showTree()
{  
  // 取得 html 元素
  var my_html_array = document.getElementsByTagName('html');
  var my_html = my_html_array[0]; 
  // 在網頁上寫入 html 元素的所有子節點
  document.getElementById('tree').innerHTML = navigate(my_html, 0);
}

//--------------------------------------------------
// 巡迴目前的節點與其子節點
// levle是第?層的節點
//--------------------------------------------------
function navigate(node, level) 
{
  var children, child, name;

  // 空的節點	
  if (node == null)
    return "";
	
  // 顯示文字的縮排	
  var indent = "";
  for (var k = 0; k < 10; k++)
    indent += "&nbsp;";
	
  // 節點的名稱, 形態, 與數值之間的空格
  var space = "";
  for (k = 0; k < 4; k++)
    space += "&nbsp;";  

  // 在節點前面加上縮排
  var tree = "";  
  for (var j = 0; j < level; j++)
    tree += indent;
	
  // 節點的名稱
  tree += "<span style='color: red;'>" + node.nodeName +"</span>";
  
  // 節點的形態
  tree += space;
  tree += "<span style='color: blue;'>" + "(Type: " + getTypeString(node.nodeType) + ")</span>";

  // 節點的數值
  tree += space;
  tree += "<span style='color: olive;'>" + "(Value: " + node.nodeValue + ")</span>" + "<br />";

  // 目前的節點有子節點
  if (node.hasChildNodes())
  {
	// 第?層的節點
    level++;
	// 巡迴目前節點的所有子節點
	for (var i = 0; i < node.childNodes.length; i++)
	{
      tree += navigate(node.childNodes[i], level);
    }
  }
  
  return tree;
}

//--------------------------------------------------
// 將節點形態的號碼轉換成可讀的字串
//--------------------------------------------------
function getTypeString(node_index) 
{
  var type;

  switch (node_index) 
  {
    case 1:
           type = "element";
           break;
    case 2:
           type = "attribute";
           break;
    case 3:
           type = "text";
           break;
    case 4:
           type = "CDATA section";
           break;
    case 5:
           type = "entity reference";
           break;
    case 6:
           type = "entity";
           break;
    case 7:
           type = "processing instruction";
           break;
    case 8:
           type = "comment";
           break;
    case 9:
           type = "document";
           break;
    case 10:
           type = "document type";
           break;
    case 11:
           type = "document fragment";
           break;
    case 12:
           type = "notation";
           break;
  }
  
  return type;
}