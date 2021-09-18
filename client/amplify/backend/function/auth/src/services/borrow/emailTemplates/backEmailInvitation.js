"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.backEmailInvitationTemplate = void 0;
const backEmailInvitationTemplate = (title, description, amount, term, address) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
​
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
	<title>*|MC:SUBJECT|*</title>
​
	<link href='https://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>
	<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600' rel='stylesheet' type='text/css'>
​
	<style type="text/css">
    html { width: 100%; }
	body { -webkit-text-size-adjust: none; -ms-text-size-adjust: none; margin: 0; padding: 0; }
	table { border-spacing: 0; border-collapse: collapse; }
	table td { border-collapse: collapse; }
	.yshortcuts a { border-bottom: none !important; }
	img { display: block !important; }
	a { text-decoration: none; color: #3accc3; }
​
	/* Media Queries */
​
	@media only screen and (max-width: 640px) {
		body { width: auto !important; }
		table[class="table600"] { width: 450px !important; }
		table[class="table-container"] { width: 90% !important; }
		table[class="container2-2"] { width: 47% !important; text-align: left !important; }
		table[class="full-width"] { width: 100% !important; text-align: center !important; }
		img[class="img-full"] { width: 100% !important; height: auto !important; }
  }
​
	@media only screen and (max-width: 479px) {
		body { width: auto !important; }
		table[class="table600"] { width: 290px !important; }
		table[class="table-container"] { width: 82% !important; }
		table[class="container2-2"] { width: 100% !important; text-align: left !important; }
		table[class="full-width"] { width: 100% !important; text-align: center !important; }
		img[class="img-full"] { width: 100% !important; }
  }
​
​
	</style>
​
</head>
​
<body marginwidth="0" marginheight="0" style="margin-top: 0; margin-bottom: 0; padding-top: 0; padding-bottom: 0; width: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" offset="0" topmargin="0" leftmargin="0">
​
	<!-- MAIN A -->
	<table width="100%" align="center" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<!-- Background -->
			<td align="center" bgcolor="#333333" background="http://drive.google.com/uc?export=view&id=1D-krjXmoQ_RW8Kz02DmCN5ZZFM8lXu96" style="background-size: cover; background-position: center;">
				<table class="table600" width="600" border="0" cellpadding="0" cellspacing="0">
​
					<tr>
						<td height="40" style="font-size: 1px; line-height: 40px;">&nbsp;</td>
					</tr>
​
					<tr>
						<td align="center">
							<img mc:edit="main a 1" src="http://drive.google.com/uc?export=view&id=1U2SJi6rRARDLued1g0zoI7eUiiFx9uV1" alt="logo" width="300" height="100">
						</td>
					</tr>
​
					<tr>
						<td height="40" style="font-size: 1px; line-height: 40px;">&nbsp;</td>
					</tr>
​
					<tr>
						<td mc:edit="main a 3" align="center" style="font-family: 'Montserrat', sans-serif; font-size: 40px; font-weight: 700; color: #656065; line-height: 44px; letter-spacing: 4px;">
							DLN Backer Invitation
						</td>
					</tr>
​
					<!-- Underline -->
					<tr>
						<td align="center">
							<table width="150" border="0" cellpadding="0" cellspacing="0">
							<!-- Edit Underline -->
								<tr>
									<td height="10" style="border-bottom: 3px solid #656065;"></td>
								</tr>
							</table>
						</td>
					</tr>
					<!-- End Underline -->
​
					<tr>
						<td height="40" style="font-size: 1px; line-height: 40px;">&nbsp;</td>
					</tr>
					<tr>
						<td mc:edit="main a 4" align="left" style="font-family: 'Open Sans', sans-serif; font-size: 15px; font-weight: 600; color: #656065; line-height: 28px; ">
							Dear Backer,
						</td>
					</tr>
					<tr>
						<td mc:edit="main a 4" align="left" style="font-family: 'Open Sans', sans-serif; font-size: 15px; font-weight: 600; color: #656065; line-height: 28px; ">
							${title}
						</td>
					</tr>
					<tr>
						<td mc:edit="main a 4" align="left" style="font-family: 'Open Sans', sans-serif; font-size: 15px; font-weight: 600; color: #656065; line-height: 28px; ">
							${description}
						</td>
					</tr>
					<tr>
						<td mc:edit="main a 4" align="left" style="font-family: 'Open Sans', sans-serif; font-size: 15px; font-weight: 600; color: #656065; line-height: 28px; ">
							${amount} for ${term}
						</td>
					</tr>
					<tr>
						<td mc:edit="main a 4" align="left" style="font-family: 'Open Sans', sans-serif; font-size: 15px; font-weight: 600; color: #656065; line-height: 28px; ">
							${address}
						</td>
					</tr>
					<tr>
						<td mc:edit="main a 4" align="left" style="font-family: 'Open Sans', sans-serif; font-size: 15px; font-weight: 600; color: #656065; line-height: 28px; ">
							Please consider backing me on DLN.
						</td>
					</tr>
					<tr>
						<td height="40" style="font-size: 1px; line-height: 40px;">&nbsp;</td>
					</tr>
​
					<!-- Button -->
					<tr>
						<td align="center">
							<table align="center" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td mc:edit="main a 5" align="center" height="38" style="font-family: 'Montserrat', sans-serif; font-size: 14px; font-weight: 500; color: #656065; line-height: 24px; padding-left: 25px; padding-right: 25px; border: 1px solid #656065;">
										<a href="https://dlndao.org/#/DLNBacking" style="text-decoration: none; color: #656065;">
											GET STARTED
										</a>
									</td>
								</tr>
								<tr>
									<td mc:edit="main a 4" align="center" style="font-family: 'Open Sans', sans-serif; font-size: 15px; font-weight: 600; color: #656065; line-height: 28px; ">
										Thank you in advance,
									</td>
								</tr>

								<tr>
						<td height="80" style="font-size: 1px; line-height: 80px;">&nbsp;</td>
					</tr>
							</table>
						</td>
					</tr>
					<!-- End Button -->
​
​
				</table>
			</td>
		</tr>
	</table>
	<!-- END MAIN A -->
</body>
</html>`;
exports.backEmailInvitationTemplate = backEmailInvitationTemplate;
