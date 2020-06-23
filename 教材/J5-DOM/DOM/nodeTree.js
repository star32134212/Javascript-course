//--------------------------------------------------
// ��ܤ�󪺾𪬵��c
//--------------------------------------------------
function showTree()
{  
  // ���o html ����
  var my_html_array = document.getElementsByTagName('html');
  var my_html = my_html_array[0]; 
  // �b�����W�g�J html �������Ҧ��l�`�I
  document.getElementById('tree').innerHTML = navigate(my_html, 0);
}

//--------------------------------------------------
// ���j�ثe���`�I�P��l�`�I
// levle�O��?�h���`�I
//--------------------------------------------------
function navigate(node, level) 
{
  var children, child, name;

  // �Ū��`�I	
  if (node == null)
    return "";
	
  // ��ܤ�r���Y��	
  var indent = "";
  for (var k = 0; k < 10; k++)
    indent += "&nbsp;";
	
  // �`�I���W��, �κA, �P�ƭȤ������Ů�
  var space = "";
  for (k = 0; k < 4; k++)
    space += "&nbsp;";  

  // �b�`�I�e���[�W�Y��
  var tree = "";  
  for (var j = 0; j < level; j++)
    tree += indent;
	
  // �`�I���W��
  tree += "<span style='color: red;'>" + node.nodeName +"</span>";
  
  // �`�I���κA
  tree += space;
  tree += "<span style='color: blue;'>" + "(Type: " + getTypeString(node.nodeType) + ")</span>";

  // �`�I���ƭ�
  tree += space;
  tree += "<span style='color: olive;'>" + "(Value: " + node.nodeValue + ")</span>" + "<br />";

  // �ثe���`�I���l�`�I
  if (node.hasChildNodes())
  {
	// ��?�h���`�I
    level++;
	// ���j�ثe�`�I���Ҧ��l�`�I
	for (var i = 0; i < node.childNodes.length; i++)
	{
      tree += navigate(node.childNodes[i], level);
    }
  }
  
  return tree;
}

//--------------------------------------------------
// �N�`�I�κA�����X�ഫ���iŪ���r��
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