<%title="Array: Splice"%>
<!--#include file="head.inc"-->
<hr>

<script>
myFish = ["angel", "clown", "mandarin", "surgeon"];
// 天使魚, 小丑魚, 花斑連鰭(俗名七彩麒麟), 刺尾魚
document.writeln("myFish: " + myFish + "<BR>");

removed = myFish.splice(2, 0, "drum"); // 石首魚(鱸?)
document.writeln("After adding 1: " + myFish + "<br>");
document.writeln("removed is: " + removed + "<br><br>");

removed = myFish.splice(3, 1);
document.writeln("After removing 1: " + myFish + "<br>");
document.writeln("removed is: " + removed + "<br><br>");

removed = myFish.splice(2, 1, "trumpet"); // 管口魚
document.writeln("After replacing 1: " + myFish + "<br>");
document.writeln("removed is: " + removed + "<br><br>");

removed = myFish.splice(0, 2, "parrot", "anemone", "blue"); // 鸚哥魚, 小丑魚, 
document.writeln("After replacing 2: " + myFish + "<br>");
document.writeln("removed is: " + removed + "<br><br>");
</script>

<hr>
<!--#include file="foot.inc"-->