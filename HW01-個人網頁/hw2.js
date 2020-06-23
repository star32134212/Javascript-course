const bound = 6; 
// 10->2 test.toString(2)
// 2->10 parseInt(test,2)
//document.writeln('<xmp>'); //debug用 把所有輸出印出來而不當成code解義
for(let i = 1; i <= bound; i++){ //let宣告的不會在區塊以外被讀取 var會
    if( i % 3 == 2){document.write('<br></br>'); }
    document.write('<table border="1">'); 
    document.writeln('<tr><td colspan="8">第' + i + 
                    '卡片<input type="checkbox" name="ans"'+'</td></tr>');
        for(let j = 0; j < 32; j++){
            var x = j.toString(2);
            if(x.length < 5){ //補0補到五位
                let lengthen = x.length;
                for(let l=0;l<5-lengthen;l++){
                    var x = '0' + x;
                    var bin = x;
                } 
            }else{
                var bin = x;
            }      
            var bin2 = bin.slice(0,6-i) + '1' + bin.slice(6-i,5); //看第幾個表格就插在第幾列
            if( j%8 == 0 ){ document.writeln('<tr>'); }
            document.write('<td>' + parseInt(bin2,2) + '</td>');               
            if( j%8 == 7 ){ document.writeln('</tr>'); } 
        } 

}

