<%title="Array: Splice"%>
<!--#include file="head.inc"-->
<hr>

<script>
myFish = ["angel", "clown", "mandarin", "surgeon"];
// �Ѩϳ�, �p����, �ᴳ�s�_(�U�W�C�m�Q��), �����
document.writeln("myFish: " + myFish + "<BR>");

removed = myFish.splice(2, 0, "drum"); // �ۭ���(�t?)
document.writeln("After adding 1: " + myFish + "<br>");
document.writeln("removed is: " + removed + "<br><br>");

removed = myFish.splice(3, 1);
document.writeln("After removing 1: " + myFish + "<br>");
document.writeln("removed is: " + removed + "<br><br>");

removed = myFish.splice(2, 1, "trumpet"); // �ޤf��
document.writeln("After replacing 1: " + myFish + "<br>");
document.writeln("removed is: " + removed + "<br><br>");

removed = myFish.splice(0, 2, "parrot", "anemone", "blue"); // �x����, �p����, 
document.writeln("After replacing 2: " + myFish + "<br>");
document.writeln("removed is: " + removed + "<br><br>");
</script>

<hr>
<!--#include file="foot.inc"-->