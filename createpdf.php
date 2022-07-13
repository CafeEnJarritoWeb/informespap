<?php
require('fpdf.php');
$pdf=new PDF_HTML();
$pdf->AliasNbPages();

////add page page automatically for its true parameter

$pdf->SetAutoPageBreak(true, 15);
$pdf->AddPage();
//add images or logo which you want
$pdf->Image('images/logo.png',18,13,33);
//set font style
$pdf->SetFont('Arial','B',14);
$pdf->WriteHTML('<para><h1>Click4Knowledge Web Programming Blog, Tutorials, jQuery, Ajax, PHP, MySQL and Demos</h1><br>
Website: <u>www.click4knowledge.com</u></para><br><br>How to Convert HTML to PDF with fpdf example');

//set the form of pdf

$pdf->SetFont('Arial','B',7);

//assign the form post value in a variable and pass it.

$htmlTable='<TABLE>
<TR>
<TD>Name:</TD>
<TD>'.$_POST['name'].'</TD>
</TR>
<TR>
<TD>Email:</TD>
<TD>'.$_POST['email'].'</TD>
</TR>
<TR>
<TD>Phone:</TD>
<TD>'.$_POST['phone'].'</TD>
</TR>
</TABLE>';
//Write HTML to pdf file and output that file on the web browser.
$pdf->WriteHTML2("<br><br><br>$htmlTable");
$pdf->SetFont('Arial','B',6);
$pdf->Output();
?>
