













<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<!-- saved from url=(0041)http://www.megacable.com.mx/contrata.html -->
<HTML xmlns="http://www.w3.org/1999/xhtml">
<HEAD>
<link href="http://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel='stylesheet' type='text/css'>
<TITLE>Megacable Televisión por cable, Internet de banda ancha</TITLE>
<META content="text/html; charset=UTF-8" http-equiv=Content-Type>
<META name=google-site-verification
	content=ud_JZlpqLbg_6nBFxIUh7yRP9PcJPnHFgOTzF_CCRfw>
<META name=description
	content="Es una empresa mexicana dedicada a la prestación de servicios de televisión por cable, servicio de internet de banda ancha y telefonía móvil y fija. Es una de las principales empresas de servicio de televisión por cable en México y de servicio de internet por cable en Latinoamérica así como de Telecomunicaciones a nivel nacional gracias a su red de fibra optica.">
<META name=keywords
	content="televisión por cable, internet, internet por cable, teléfono casa, telefonía movil, celular, canales, ppv, pago por evento, vod, on demand, internet banda ancha, internet fibra optica, telecomunicaciones, servicio de internet, internet alta velocidad, proveedor de internet banda ancha, telefonía fija, llamadas locales, telefonia celular triple play, tripleplay, cuadruple play, cuadrupleplay">
<META name=author content=Megacable>
<LINK rel=image_src type=image/jpeg
	href="http://www.megacable.com.mx/images/DEFAULT_SHARE_IMAGE.jpg">
<SCRIPT type=text/javascript>
	var _gaq = _gaq || [];
	_gaq.push([ '_setAccount', 'UA-20144361-1' ]);
	_gaq.push([ '_setDomainName', 'megacable.com.mx' ]);
	_gaq.push([ '_trackPageview' ]);

	(function() {
		var ga = document.createElement('script');
		ga.type = 'text/javascript';
		ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl'
				: 'http://www')
				+ '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(ga, s);
	})();
</SCRIPT>
<LINK rel=stylesheet type=text/css href="ayuda_files/css.css">
<LINK rel=stylesheet type=text/css href="ayuda_files/main.css">
<LINK rel="shortcut icon" type=image/x-icon href="favicon.ico">
<SCRIPT type=text/javascript src="ayuda_files/jquery-1.6.4.min.js"></SCRIPT>

<SCRIPT type=text/javascript src="ayuda_files/jquery.tools.min.js"></SCRIPT>

<SCRIPT type=text/javascript src="ayuda_files/scrollable.autoscroll.js"></SCRIPT>

<SCRIPT type=text/javascript src="ayuda_files/jquery.scrollTo-min.js"></SCRIPT>
<!--[if lt IE 9]>
<SCRIPT type=text/javascript 
src="ayuda_files/excanvas.js"></SCRIPT>
<![endif]-->
<SCRIPT type=text/javascript src="ayuda_files/spinners.js"></SCRIPT>
<!-- optional -->
<SCRIPT type=text/javascript src="ayuda_files/tipped.js"></SCRIPT>
<LINK rel=stylesheet type=text/css
	href="ayuda_files/megacable_com_mx.htm">
<SCRIPT type=text/javascript src="ayuda_files/main.js"></SCRIPT>
<!--[if IE]><LINK rel=stylesheet type=text/css 
href="ayuda_files/main_ie.css"><![endif]-->
<META name=GENERATOR content="MSHTML 8.00.6001.19088">

<STYLE type=text/css>
@import url( ayuda_files/jquery.realperson.css );
</STYLE>

		<SCRIPT type=text/javascript src="ayuda_files/jquery.realperson.js"></SCRIPT>

		<SCRIPT type=text/javascript src="ayuda_files/jquery.validate.pack.js"></SCRIPT>

		<SCRIPT>
			$(function() {
				//$("#num_recomienda").change(function() {
				//	var valor = $(this).val();
				//	$(".recomienda").removeClass('visible');
				//	for (i = 0; i < valor; i++) {
				//		$("#recomienda_" + i).addClass('visible');
				//	}
				//});

				$('#defaultReal').realperson();
				/*
				$("#forma_contrata").validate(({
									submitHandler : function(form) {
										$.ajax({
												 type : "POST",
												 url : "inc/check_capcha.php",
												 data : { defaultReal : $(".hasRealPerson").val(),defaultRealHash : $(".realperson-hash").val()}
											   }).done(
														function(msg) {
															if (msg == 'OK') {
																form.submit();
															} else {
																alert("Escribe el codigo de confirmación");
																$(".hasRealPerson").css('background-color','#DFDFDF').focus();
															}
														});

									},
									invalidHandler : function(form, validator) {
										var errors = validator.numberOfInvalids();										
										if (errors) {
											alert('Es necesario escribir todos los campos requeridos');
										}
									},
									errorClass : "invalid"
								}));
				*/
			});
			
			
			function validate_email(field) {
			    with (field)
			    {
			        if(/^\w+([\.\_-]?\w+)*@\w+([\.\_-]?\w+)*\.[a-zA-Z]{2,4}$/.test(value))
			        {
			            return true;
			        }
			        else {
			            return false;
			        }
			    }
			}

			function regIsDigit(fData) {
				var reg = new RegExp(/^[0-9]+$/);
				return (reg.test(fData));
			}
			
			function enviar(frm){
			    var numeroCuenta 		= document.getElementById('cuenta');
			    var nombreYApellido 	= document.getElementById('nombre');                
			    var correoElectronico 	= document.getElementById('email');
			    var texto 				= document.getElementById("mensaje_mail");
			    var motivoContactoObj   = document.getElementById("motivo_contacto_mail");
			    var motivoContacto      = document.getElementById("motivo_contacto_mail").value;
			    document.getElementById("motivoContactoBand").value = motivoContacto;
			    
			    var defaultReal = $(".hasRealPerson").val();
			    var defaultRealHash = $(".realperson-hash").val();
			    			    			    
			    numeroCuenta.value 		= $.trim(numeroCuenta.value);
			    nombreYApellido.value 	= $.trim(nombreYApellido.value);                
			    correoElectronico.value = $.trim(correoElectronico.value);
			    texto.value 			= $.trim(texto.value);
			    var errMsg = '';
			    
			    //alert(regIsDigit(numeroCuenta.value));
			    
			    if($.trim(numeroCuenta.value).length > 0 && ( !regIsDigit(numeroCuenta.value) || $.trim(numeroCuenta.value).length != 10 )){
			    	errMsg += 'El Número de Cuenta/Contrato es de 10 dígitos\n';
			        //numeroCuenta.value = ''; 
			    	$("#cuenta").css('background-color','#DFDFDF');
			        numeroCuenta.focus();			       
			    }else{
			    	$("#cuenta").css('background-color','white');
			    }
			    
			    if($.trim(nombreYApellido.value) == ''){
			    	errMsg += 'Debe proporcionar Nombre y Apellido\n';
			    	nombreYApellido.value = '';
			        $("#nombre").css('background-color','#DFDFDF');
			        //nombre.focus();
			    }else{
			    	$("#nombre").css('background-color','white');
			    }

			    if($.trim(correoElectronico.value) == ''){
			    	errMsg += 'Debe proporcionar Correo Electrónico\n';
			    	correoElectronico.value = '';
			        $("#email").css('background-color','#DFDFDF');
			        //email.focus();
			    }else{
			    	$("#email").css('background-color','white');
			    }

			    if(validate_email(correoElectronico) == false){
			    	errMsg += 'El formato de Correo Electrónico es incorrecto\n';
			    	$("#email").css('background-color','#DFDFDF');
			        //email.focus();			        
			    }else{
			    	$("#email").css('background-color','white');
			    }

			    if($.trim(motivoContacto) == '' || motivoContactoObj.selectedIndex  == 0){
			    	errMsg += 'Debe proporcionar Motivo de Contacto\n';			    	
			    	$("#motivo_contacto_mail").css('background-color','#DFDFDF');
			    }else{
			    	$("#motivo_contacto_mail").css('background-color','white');
			    }
			    
			    if($.trim(texto.value) == ''){
			    	errMsg += 'Debe proporcionar Contenido\n';
			        texto.value = '';
			        $("#mensaje_mail").css('background-color','#DFDFDF');
			        //texto.focus();
			    }else{
			    	$("#mensaje_mail").css('background-color','white');
			    }
			    
			    if($.trim(defaultReal) == ''){
			    	errMsg += 'Debe proporcionar el texto de la imagen\n';
			        $("#defaultReal").css('background-color','#DFDFDF');
			        //texto.focus();
			    }else{
			    	$("#defaultReal").css('background-color','white');
			    }

			    
			    if($.trim(errMsg) != ''){
			    	alert(errMsg);
			    	return false;
			    }else{
			    	document.getElementById("realPersonCapcha").value = defaultReal;
			    	document.getElementById("realPersonHashCapcha").value = defaultRealHash;
			    	$("#cmdSendEmail").prop('disabled', true);
			    	$("#form_ayuda_email").submit();
			    }
			    			    			    			    
			}
			
			function capchaError(){				
				var captchaBand = document.getElementById("capchaErrorBand").value;				
				if(captchaBand == 1){					
					document.getElementById("capchaErrorBand").value = 0;
					var selectedMotivoContacto = document.getElementById("motivoContactoBand").value;
					document.getElementById("motivo_contacto_mail").value = selectedMotivoContacto;
					alert("El texto de la imagen no corresponde.");					
				}
				
			}
			
		</SCRIPT>
</HEAD>
<BODY class=alt_font onload="capchaError();">
	<DIV id=wrapper>
		
		<DIV id=contenedor_central>
			<A id=logo_image href="http://www.megacable.com.mx/home.html"><IMG
				border=0 alt=Megacable src="ayuda_files/logo.png" width=320
				height=80></A>
			
			
			<DIV class=clear></DIV>
		</DIV>
		<DIV id=sub_menu_wrap>
			<DIV id=sub_menu class=alt_font_bold>
				<DIV style="TEXT-ALIGN: left" id=menu_tv_informacion
					class=menu_submenu>
					<A href="http://www.megacable.com.mx/tv_informacion.html"
						rel=menuhijo_tv_informacion target=_self>Televisión</A> <A
						href="http://www.megacable.com.mx/internet_informacion.html"
						rel=menuhijo_internet_informacion target=_self>Internet</A> <A
						href="http://www.megacable.com.mx/telefono_informacion.html"
						rel=menuhijo_telefono_informacion target=_self>Telefonía</A> <A
						href="http://www.megacable.com.mx/cell_informacion.html"
						rel=menuhijo_cell_informacion target=_self>Celular</A>
				</DIV>
				<DIV style="TEXT-ALIGN: right" id=menu_ class=menu_submenu>
					<A href="http://www.megacable.com.mx/guiadecanales.html"
						rel=menuhijo_guiadecanales target=_self>Servicios en Linea</A> <A
						class=hijo_selected href="http://www.megacable.com.mx/ayuda.html"
						rel=menuhijo_ayuda target=_self>Ayuda</A> <A
						href="http://www.megacable.com.mx/politicas.html"
						rel=menuhijo_politicas target=_self>Información</A>
				</DIV>
			</DIV>
			<DIV id=menuhijo_tv_informacion class=super_menu>
				<DIV class=imagen_supermenu>
					<IMG src="ayuda_files/tv_informacion.png">
				</DIV>
				<DIV class=supermenu_columna>
					<A class="columna_titulo alt_font_bold"
						href="http://www.megacable.com.mx/tv_informacion.html">Televisión</A>
					<A href="http://www.megacable.com.mx/tv_canales.html" target=_self>Canales</A>
					<A href="http://www.megacable.com.mx/tv_digital.html" target=_self>Megacable
						Digital</A> <A href="http://www.megacable.com.mx/tv_hd.html"
						target=_self>HD</A> <A
						href="http://www.megacable.com.mx/tv_dvr.html" target=_self>DVR</A>
					<A href="http://www.megacable.com.mx/tv_hbo.html" target=_self>HBO</A>
				</DIV>
				<DIV class=supermenu_columna>
					<DIV class="columna_titulo alt_font_bold"></DIV>
					<A href="http://www.megacable.com.mx/tv_moviecity.html"
						target=_self>Moviecity</A> <A
						href="http://www.megacable.com.mx/tv_ppv.html" target=_self>PPV</A>
					<A href="http://www.megacable.com.mx/tv_vod.html" target=_self>On
						Demand</A> <A href="http://www.megacable.com.mx/tv_adultpack.html"
						target=_self>Adultos</A>
				</DIV>
				<DIV class=banner_supermenu>
					<A
						style="BACKGROUND: url(ayuda_files/images/layout/supermenus/8_tv_hdhtml.jpg) no-repeat"
						class=banner_submenu href="http://www.megacable.com.mx/tv_hd.html"
						target=_self></A>
				</DIV>
			</DIV>
			<DIV id=menuhijo_internet_informacion class=super_menu>
				<DIV class=imagen_supermenu>
					<IMG src="ayuda_files/internet_informacion.png">
				</DIV>
				<DIV class=supermenu_columna>
					<A class="columna_titulo alt_font_bold"
						href="http://www.megacable.com.mx/internet_informacion.html">Internet</A>
					<A href="http://www.megacable.com.mx/internet_velocidades.html"
						target=_self>Velocidades</A> <A
						href="http://www.megacable.com.mx/internet_inalambrico.html"
						target=_self>Inalámbrico</A> <A
						href="http://www.megacable.com.mx/internet_wifi.html" target=_self>Wifi</A>
					<A href="http://www.megacable.com.mx/internet_seguridad.html"
						target=_self>Seguridad McAfee</A> <A
						href="http://www.megacable.com.mx/internet_google.html"
						target=_self>Google Mail</A>
				</DIV>
				<DIV class=supermenu_columna>
					<DIV class="columna_titulo alt_font_bold"></DIV>
					<A href="http://www.megacable.com.mx/internet_megared.html"
						target=_self>Portal Megared</A>
				</DIV>
				<DIV class=banner_supermenu>
					<A
						style="BACKGROUND: url(ayuda_files/images/layout/supermenus/9_internet_wifihtml.png) no-repeat"
						class=banner_submenu
						href="http://www.megacable.com.mx/internet_wifi.html" target=_self></A>
				</DIV>
			</DIV>
			<DIV id=menuhijo_telefono_informacion class=super_menu>
				<DIV class=imagen_supermenu>
					<IMG src="ayuda_files/telefono_informacion.png">
				</DIV>
				<DIV class=supermenu_columna>
					<A class="columna_titulo alt_font_bold"
						href="http://www.megacable.com.mx/telefono_informacion.html">Telefonía</A>
					<A href="http://www.megacable.com.mx/telefono_planes.html"
						target=_self>Planes</A> <A
						href="http://www.megacable.com.mx/telefono_adicionales.html"
						target=_self>Servicios Adicionales</A> <A
						href="http://www.megacable.com.mx/telefono_portabilidad.html"
						target=_self>Portabilidad</A> <A
						href="http://www.megacable.com.mx/telefono_comunidad_yoo.html"
						target=_self>Comunidad YOO</A>
				</DIV>
				<DIV class=banner_supermenu>
					<A
						style="BACKGROUND: url(ayuda_files/images/layout/supermenus/10_telefono_portabilidadhtml.png) no-repeat"
						class=banner_submenu
						href="http://www.megacable.com.mx/telefono_portabilidad.html"
						target=_self></A>
				</DIV>
			</DIV>
			<DIV id=menuhijo_cell_informacion class=super_menu>
				<DIV class=imagen_supermenu>
					<IMG src="ayuda_files/cell_informacion.png">
				</DIV>
				<DIV class=supermenu_columna>
					<A class="columna_titulo alt_font_bold"
						href="http://www.megacable.com.mx/cell_informacion.html">Celular</A>
					<A href="http://www.megacable.com.mx/cell_planes.html" target=_self>Planes</A>
					<A href="http://www.megacable.com.mx/cell_paquetes.html"
						target=_self>Paquetes</A> <A
						href="http://www.megacable.com.mx/cell_portabilidad.html"
						target=_self>Portabilidad</A> <A
						href="http://www.megacable.com.mx/cell_equipos.html" target=_self>Equipos</A>
					<A href="http://www.megacable.com.mx/cell_blackberry.html"
						target=_self>Blackberry</A>
				</DIV>
				<DIV class=supermenu_columna>
					<DIV class="columna_titulo alt_font_bold"></DIV>
					<A href="http://www.megacable.com.mx/cell_datos.html" target=_self>Plan
						de Datos</A>
				</DIV>
				<DIV class=banner_supermenu>
					<A
						style="BACKGROUND: url(ayuda_files/images/layout/supermenus/11_cell_planeshtml.png) no-repeat"
						class=banner_submenu
						href="http://www.megacable.com.mx/cell_planes.html" target=_self></A>
				</DIV>
			</DIV>
			<DIV id=menuhijo_guiadecanales class=super_menu>
				<DIV class=imagen_supermenu>
					<IMG src="ayuda_files/guiadecanales.png">
				</DIV>
				<DIV class=supermenu_columna>
					<A class="columna_titulo alt_font_bold"
						href="http://www.megacable.com.mx/guiadecanales.html">Servicios
						en Linea</A> <A href="http://www.megacable.com.mx/programacion.html"
						target=_self>Guía de programación</A> <A
						href="https://serviciosenlinea.megacable.com.mx/" target=_self>Mi
						cuenta / Pago en línea</A> <A
						href="http://www.megacable.com.mx/webmail.html" target=_self>Ir
						a webmail</A>
				</DIV>
				<DIV class=banner_supermenu></DIV>
			</DIV>
			<DIV id=menuhijo_ayuda class=super_menu>
				<DIV class=imagen_supermenu>
					<IMG src="ayuda_files/ayuda.png">
				</DIV>
				<DIV class=supermenu_columna>
					<A class="columna_titulo alt_font_bold"
						href="http://www.megacable.com.mx/ayuda.html">Ayuda</A> <A
						href="http://www.megacable.com.mx/internet_seguridad.html"
						target=_self>Centro de seguridad</A> <A
						href="http://www.megacable.com.mx/contrata.html" target=_self>Contacto</A>
					<A href="http://atencionaclientes.megacable.com.mx/" target=_self>Atención
						a Clientes</A> <A href="http://www.megacable.com.mx/ayuda_cis.html"
						target=_self>Localizar Centros Integrales de Servicio</A> <A
						href="http://www.megacable.com.mx/ayuda.html" target=_self>Preguntas
						Frecuentes</A>
				</DIV>
				<DIV class=supermenu_columna>
					<DIV class="columna_titulo alt_font_bold"></DIV>
				</DIV>
				<DIV class=banner_supermenu></DIV>
			</DIV>
			<DIV id=menuhijo_politicas class=super_menu>
				<DIV class=imagen_supermenu>
					<IMG src="ayuda_files/politicas.png">
				</DIV>
				<DIV class=supermenu_columna>
					<A class="columna_titulo alt_font_bold"
						href="http://www.megacable.com.mx/politicas.html">Información</A>
					<A href="http://www.megared.com.mx/" target=_self>Portal
						Megared</A> <A href="http://www.megakids.com.mx/" target=_self>Megakids</A>
					<A href="http://www.megacable.com.mx/tel_destinos_nea.html"
						target=_self>Destinos Non Equal Access</A>
				</DIV>
				<DIV class=banner_supermenu></DIV>
			</DIV>
		</DIV>
		
		<DIV style="PADDING-TOP: 0px" class=seccion>
			<DIV
				style="BACKGROUND: url(ayuda_files/images/cotizador/bg2.jpg) #fff repeat-y"
				class=main_wrapper_content>
				<DIV class=top_cotizador></DIV>
				<DIV
					style="WIDTH: 238px; BACKGROUND: url(ayuda_files/images/layout/backgrounds/bg_menu_cotizador2.jpg) repeat-y right 50%; FLOAT: right"
					id=menu_cotizador>					
					<DIV style="MARGIN: 0px" class=separador_height></DIV>
					<DIV style="MARGIN: 0px" class=separador></DIV>
					<DIV class=menu_ayuda_oscuro_small>
					<!--
						<H3>@AYUDAMEGACABLE</H3>
						<CENTER>
							<A class="auto transparent_hover" title=Facebook
								href="http://facebook.com/megacable"><IMG border=0
								alt=Facebook src="ayuda_files/facebook_2.png" width=38 height=38></A>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<A
								class="auto transparent_hover" title=Twitter
								href="http://twitter.com/megacable"><IMG border=0
								alt=Twitter src="ayuda_files/twitter_2.png" width=38 height=38></A>
						</CENTER>
					-->	
					</DIV>
					<DIV style="MARGIN: 0px" class=separador></DIV>
					<DIV style="BACKGROUND: none transparent scroll repeat 0% 0%"
						class=menu_ayuda_remate_big>
						<DIV class=phone_ayuda>
							<H2>LLÁMANOS</H2>
							<P>
								Teléfono de<BR>atención a clientes
							</P>
						</DIV>
						<H1 class=red_tel>9690 0000</H1>
					</DIV>
				</DIV>
				<DIV style="WIDTH: 642px; BACKGROUND: none transparent scroll repeat 0% 0%; FLOAT: left; MARGIN-LEFT: 30px" id=contenido_cotizador>
					<BR>
					<!-- <H1 class=gray>ENVIAR CORREO</H1> -->
					<FORM action="MailSender" method="post" id="form_ayuda_email" name="form_ayuda_email">
						<input type="hidden" id="realPersonCapcha" name="realPersonCapcha" value="0"/>
						<input type="hidden" id="realPersonHashCapcha" name="realPersonHashCapcha" value="0"/>
						<input type="hidden" id="capchaErrorBand" name="capchaErrorBand" value="0"/>
						<input type="hidden" id="motivoContactoBand" name="motivoContactoBand" value=""/>
						
						<DIV class=seccion_contacto>
							<DIV class=titulo_seccion_contacto>Datos del correo</DIV>
							<DIV class=columna_contacto>	
								<LABEL>N&uacute;mero de Cuenta/Contrato<SPAN></SPAN></LABEL>
								<INPUT id=cuenta class="text_input required" type=text name=cuenta maxlength="10" value=""> 						
																
								<LABEL>Correo Electr&oacute;nico<SPAN>*</SPAN></LABEL>
								<INPUT id=email class="text_input required email" type=text name=email value="">	
								
								<LABEL>Motivo de contacto<SPAN>*</SPAN></LABEL>
								
								<select class="select_box" style="width: 200px;" id="motivo_contacto_mail" name="motivo_contacto_mail">
								<OPTION disabled selected value="">Selecciona una opción</OPTION>	
									<OPTION disabled>--</OPTION>
				<OPTGROUP label="Clientes Actuales">
				Clientes Actuales
				<OPTION value="Consulta de Saldo">Consulta de Saldo</OPTION>
				<OPTION value="Soporte Tecnico Television">Soporte Técnico Television</OPTION>
				<OPTION value="Soporte Tecnico Internet">Soporte Técnico Internet</OPTION>
				<OPTION value="Soporte Tecnico Telefonia">Soporte Técnico Telefonía</OPTION>
				<OPTION value="Informacion de Promociones">Información de Promociones</OPTION>
				<OPTION value="Contratar Servicios Adicionales">Contratar Servicios Adicionales</OPTION>
				<OPTION value="Quejas y Sugerencias">Quejas y Sugerencias</OPTION>
				<OPTION value=Visitantes>Visitantes</OPTION>
				</OPTGROUP>
				<OPTGROUP label="Clientes Nuevos">
				Clientes Nuevos
				<OPTION value="Informacion de Promociones Nuevo">Información de Promociones</OPTION>
				<OPTION value="Contratacion de Servicios Nuevo">Contratación de Servicios</OPTION>
				<OPTION value="Quejas y Sugerencias Nuevo">Quejas y Sugerencias</OPTION>
				</OPTGROUP>
								</select>							
															
							</DIV>
							<DIV class=columna_contacto_large>
								<LABEL class=columna_contacto_large>Nombre y Apellido<SPAN>*</SPAN></LABEL> 
								<INPUT id=nombre class="text_input_large required" type=text name=nombre maxlength="30" value="">
							</DIV>								
							<DIV class=contenido_mensaje>
								<LABEL class="columna_contacto_large">Contenido del mensaje<SPAN>*</SPAN></LABEL><br/>
								<TEXTAREA id=mensaje_mail name=mensaje_mail></TEXTAREA>
							</DIV>
							<DIV id=capcha_mail>
								<LABEL>Escribe el siguiente texto:</LABEL><BR>
								<BR>
								<INPUT id=defaultReal class=text_input type=text
									name=defaultReal><BR>
								<DIV
									style="WIDTH: 123px; FLOAT: left; COLOR: #116daa; FONT-SIZE: 13px">*
									Campos Requeridos</DIV>
								<INPUT class=button_submit value=ENVIAR onclick="enviar()" id="cmdSendEmail" name="cmdSendEmail" >
								<CENTER></CENTER>
							</DIV>							
						</DIV>
					</FORM>
					<DIV class=clear></DIV>					
					<BR>
				</DIV>
			</DIV>
		</DIV>
		<BR>
		
		<DIV id=block_bg>
			<DIV class=fix_position>
				<DIV id=menu_emulation class=alt_font_bold>
					<A id=emu_correo href="http://www.megacable.com.mx/#">Mi correo</A>
					<A id=emu_cuenta href="http://www.megacable.com.mx/#">Mi cuenta</A>
				</DIV>
				<DIV id=mi_correo_hover>
					<DIV class="title alt_font_bold">Mi Correo</DIV>
					<!--<form action="" method="post" id="form_correo">
                        <p>Usuario</p>
                        <div class="left">
                            <input type="text" name="usuario" class="input_text_short" />
                        </div>
                        <div class="left" style="width:20px; text-align:center">
                        @
                        </div>
                        <div class="left">
                            <select name="server" class="selectbox_short">
                                <option value="megared.net.mx">megared.net.mx</option>
                            </select>
                        </div>
                        <div class="clear"></div>
                        <p>Contraseña</p>
                        <div class="left">
                            <input type="password" name="usuario" class="input_text_short" />                	
                        </div>
                        <div class="left" style="width:20px; text-align:center">
                        
                        </div>
                        <div class="left">
                            <input type="submit" class="button_submit" value="Entrar" />
                        </div>
                        <div class="clear"></div> 
                    </form>                       !-->
					<A href="http://www.megacable.com.mx/webmail.html">Revisar
						correo</A> <A
						href="http://servicios.megared.net.mx/aprov_numero_cliente/index.php"
						target=_blank>Crear una nueva cuenta</A>
				</DIV>
				<DIV id=mi_cuenta_hover>
					<DIV class="title alt_font_bold">Mi Cuenta</DIV>
					<A
						href="https://serviciosenlinea.megacable.com.mx/serviciosenlinea/">Login</A>
					<A
						href="https://serviciosenlinea.megacable.com.mx/serviciosenlinea/Servicios/NIPdeSeguridad/SolicituddeRegistro/tabid/66/Default.aspx">Registro</A>
					<A href="http://www.megacable.com.mx/webmail.html">Correo</A> <A
						href="https://serviciosenlinea.megacable.com.mx/serviciosenlinea/">Estado
						de cuenta</A> <A
						href="https://serviciosenlinea.megacable.com.mx/serviciosenlinea/">Pago
						en línea</A>
				</DIV>
			</DIV>
			<DIV id=selecion_zona>
				<DIV class=half></DIV>
				<DIV id=zona_overlay>
					<A id=close_zona class=close_zona
						href="http://www.megacable.com.mx/#"><IMG border=0 alt=X
						src="ayuda_files/close.png" width=29 height=29></A>
					<P></P>
					<DIV class="title alt_font_bold">GUADALAJARA</DIV>
					<BR>
					<A class="button_red close_zona"
						href="http://www.megacable.com.mx/#">
						<DIV class=button_left></DIV>
						<DIV class=button_center>Continuar</DIV>
						<DIV class=button_right></DIV>
					</A>
					<P>Si deseas cambiar de ubicación, selecciona una opción de
						esta lista</P>
					<FORM id=form_cp method=post action="">
						<SELECT name=change_location>
							<OPTION selected value=175>ACAMBAY</OPTION>
							<OPTION value=75>ACATZINGO</OPTION>
							<OPTION value=165>ACUITZIO</OPTION>
							<OPTION value=82>ADOLFO RUIZ CORTINEZ</OPTION>
							<OPTION value=1008>AGUA PRIETA</OPTION>
							<OPTION value=171>AHOME</OPTION>
							<OPTION value=169>ALAMOS</OPTION>
							<OPTION value=160>ALHUEY</OPTION>
							<OPTION value=124>ALMOLOYA DE JUAREZ</OPTION>
							<OPTION value=221>ALTAR</OPTION>
							<OPTION value=1033>ALVARO CARRILLO</OPTION>
							<OPTION value=162>AMOZOC</OPTION>
							<OPTION value=141>ANGAMACUTIRO</OPTION>
							<OPTION value=158>ANGOSTURA</OPTION>
							<OPTION value=1031>ARRIAGA</OPTION>
							<OPTION value=122>ATLACOMULCO</OPTION>
							<OPTION value=216>BAHÍA DE KINO</OPTION>
							<OPTION value=50>BANDERILLA</OPTION>
							<OPTION value=1010>BARRILES</OPTION>
							<OPTION value=230>BENITO JUAREZ SLRC</OPTION>
							<OPTION value=239>BERRIOZABAL</OPTION>
							<OPTION value=115>CABO SAN LUCAS</OPTION>
							<OPTION value=220>CABORCA</OPTION>
							<OPTION value=156>CADEREYTA</OPTION>
							<OPTION value=233>CALIMAYA</OPTION>
							<OPTION value=217>CANANEA</OPTION>
							<OPTION value=168>CARAPAN</OPTION>
							<OPTION value=237>CARBO</OPTION>
							<OPTION value=56>CARDEL</OPTION>
							<OPTION value=1004>CASAS GRANDES</OPTION>
							<OPTION value=1011>CD HIDALGO</OPTION>
							<OPTION value=3>CD. OBREGON</OPTION>
							<OPTION value=78>CHAMPOTON</OPTION>
							<OPTION value=140>CHARO</OPTION>
							<OPTION value=200>CHAVINDA</OPTION>
							<OPTION value=52>CHIAPA DE CORZO</OPTION>
							<OPTION value=147>CHILCHOTA</OPTION>
							<OPTION value=28>CHOLULA</OPTION>
							<OPTION value=182>CHURINTZIO</OPTION>
							<OPTION value=178>CIUDAD CONSTITUCION</OPTION>
							<OPTION value=17>COATEPEC</OPTION>
							<OPTION value=173>COLIMA</OPTION>
							<OPTION value=1022>COMITÁN</OPTION>
							<OPTION value=188>COMONFORT</OPTION>
							<OPTION value=201>CONCORDIA</OPTION>
							<OPTION value=21>COSAMALOAPAN</OPTION>
							<OPTION value=60>COSTA RICA</OPTION>
							<OPTION value=1016>CUAUTITLÁN IZCALLI</OPTION>
							<OPTION value=51>CUAUTLANCINGO</OPTION>
							<OPTION value=136>CUITZEO</OPTION>
							<OPTION value=9>CULIACAN</OPTION>
							<OPTION value=32>DURANGO</OPTION>
							<OPTION value=59>EL DORADO</OPTION>
							<OPTION value=25>EL FUERTE</OPTION>
							<OPTION value=24>EL ROSARIO</OPTION>
							<OPTION value=1024>EL SECO</OPTION>
							<OPTION value=76>EMILIANO ZAPATA</OPTION>
							<OPTION value=22>EMPALME</OPTION>
							<OPTION value=11>ESCUINAPA</OPTION>
							<OPTION value=1007>ESQUEDA</OPTION>
							<OPTION value=45>FCO I MADERO</OPTION>
							<OPTION value=81>GABRIEL LEYVA SOLANO</OPTION>
							<OPTION value=101>GALEANA</OPTION>
							<OPTION value=30>GOMEZ PALACIO</OPTION>
							<OPTION value=41>GUADALAJARA</OPTION>
							<OPTION value=7>GUASAVE</OPTION>
							<OPTION value=2>GUAYMAS</OPTION>
							<OPTION value=181>GUERRERO NEGRO</OPTION>
							<OPTION value=88>GUTIERREZ ZAMORA</OPTION>
							<OPTION value=1>HERMOSILLO</OPTION>
							<OPTION value=72>HUAJUAPAN DE LEON</OPTION>
							<OPTION value=137>HUANDACAREO</OPTION>
							<OPTION value=5>HUATABAMPO</OPTION>
							<OPTION value=1019>HUATULCO</OPTION>
							<OPTION value=130>HUEHUETOCA</OPTION>
							<OPTION value=1015>HUEYPOXTLA</OPTION>
							<OPTION value=127>HUIXQUILUCAN</OPTION>
							<OPTION value=1021>HUIXTLA</OPTION>
							<OPTION value=139>INDAPARAPEO</OPTION>
							<OPTION value=67>IXMIQUILPAN</OPTION>
							<OPTION value=152>IXTLAHUACA</OPTION>
							<OPTION value=65>IXTLAHUACAN DE LOS MEMBRILLOS</OPTION>
							<OPTION value=14>JACONA</OPTION>
							<OPTION value=151>JALPA</OPTION>
							<OPTION value=153>JEREZ</OPTION>
							<OPTION value=198>JIQUILPAN</OPTION>
							<OPTION value=90>JOJUTLA</OPTION>
							<OPTION value=234>JOQUICINGO</OPTION>
							<OPTION value=80>JUAN JOSE RIOS</OPTION>
							<OPTION value=1009>JUÁREZ</OPTION>
							<OPTION value=154>JUVENTINO</OPTION>
							<OPTION value=177>LA PAZ</OPTION>
							<OPTION value=119>LA PIEDAD</OPTION>
							<OPTION value=47>LEON</OPTION>
							<OPTION value=31>LERDO</OPTION>
							<OPTION value=108>LERMA</OPTION>
							<OPTION value=179>LORETO</OPTION>
							<OPTION value=6>LOS MOCHIS</OPTION>
							<OPTION value=215>MAGDALENA</OPTION>
							<OPTION value=204>MANLIO FABIO</OPTION>
							<OPTION value=149>MARAVATIO</OPTION>
							<OPTION value=39>MATAMOROS</OPTION>
							<OPTION value=86>MATIAS ROMERO</OPTION>
							<OPTION value=194>MAZAMITLA</OPTION>
							<OPTION value=10>MAZATLAN</OPTION>
							<OPTION value=107>METEPEC</OPTION>
							<OPTION value=61>MIGUEL ALEMAN</OPTION>
							<OPTION value=189>MINERAL DEL MONTE</OPTION>
							<OPTION value=1026>MISANTLA</OPTION>
							<OPTION value=159>MOCORITO</OPTION>
							<OPTION value=1001>MOCTEZUMA</OPTION>
							<OPTION value=33>MORELIA</OPTION>
							<OPTION value=1006>NACO</OPTION>
							<OPTION value=1002>NACOZARI</OPTION>
							<OPTION value=4>NAVOJOA</OPTION>
							<OPTION value=26>NAVOLATO</OPTION>
							<OPTION value=206>NOGALES</OPTION>
							<OPTION value=132>NUMARAN</OPTION>
							<OPTION value=196>OMITLAN DE JUAREZ</OPTION>
							<OPTION value=87>PAPANTLA</OPTION>
							<OPTION value=157>PASTOR</OPTION>
							<OPTION value=134>PATZCUARO</OPTION>
							<OPTION value=70>PEROTE</OPTION>
							<OPTION value=84>PETATLAN</OPTION>
							<OPTION value=184>PIEDRAS NEGRAS</OPTION>
							<OPTION value=27>PUEBLA</OPTION>
							<OPTION value=231>PUENTE GRANDE</OPTION>
							<OPTION value=223>PUERTO PEÑASCO</OPTION>
							<OPTION value=135>PURUANDIRO</OPTION>
							<OPTION value=54>QUERETARO</OPTION>
							<OPTION value=193>SAHUAYO</OPTION>
							<OPTION value=1030>SALAMANCA</OPTION>
							<OPTION value=1020>SALINA CRUZ</OPTION>
							<OPTION value=229>SAN ANTONIO LA ISLA</OPTION>
							<OPTION value=227>SAN BLAS</OPTION>
							<OPTION value=36>SAN CRISTOBAL</OPTION>
							<OPTION value=150>SAN FELIPE</OPTION>
							<OPTION value=1034>SAN FELIPE, SON</OPTION>
							<OPTION value=148>SAN JOSE DE GRACIA</OPTION>
							<OPTION value=114>SAN JOSÉ DEL CABO</OPTION>
							<OPTION value=1035>SAN JOSE ITURBIDE</OPTION>
							<OPTION value=187>SAN LUIS DE LA PAZ</OPTION>
							<OPTION value=208>SAN LUIS RIO COL</OPTION>
							<OPTION value=109>SAN MATEO ATENCO</OPTION>
							<OPTION value=1028>SAN MIGUEL ALLENDE</OPTION>
							<OPTION value=40>SAN PEDRO</OPTION>
							<OPTION value=1032>SAN PEDRO POCHUTLA</OPTION>
							<OPTION value=219>SANTA ANA</OPTION>
							<OPTION value=1023>SANTA MARÍA DEL RÍO</OPTION>
							<OPTION value=235>SANTA MARIA JAJALPA</OPTION>
							<OPTION value=232>SANTA MARIA RAYON</OPTION>
							<OPTION value=180>SANTA ROSALIA</OPTION>
							<OPTION value=192>SANTO TOMAS</OPTION>
							<OPTION value=118>SILAO</OPTION>
							<OPTION value=224>SONOYTA</OPTION>
							<OPTION value=146>TANGANCICUARO</OPTION>
							<OPTION value=143>TANHUATO</OPTION>
							<OPTION value=166>TARIMBARO</OPTION>
							<OPTION value=190>TECALI</OPTION>
							<OPTION value=77>TECAMACHALCO</OPTION>
							<OPTION value=64>TEHUACAN</OPTION>
							<OPTION value=103>TEHUIXTLA</OPTION>
							<OPTION value=131>TEMOAYA</OPTION>
							<OPTION value=112>TENANCINGO</OPTION>
							<OPTION value=120>TENANGO DEL VALLE</OPTION>
							<OPTION value=163>TEPATLAXCO</OPTION>
							<OPTION value=74>TEPEACA</OPTION>
							<OPTION value=12>TEPIC</OPTION>
							<OPTION value=129>TEPOJACO</OPTION>
							<OPTION value=126>TEPOZTLÁN</OPTION>
							<OPTION value=164>TIERRA BLANCA</OPTION>
							<OPTION value=19>TLACOTALPAN</OPTION>
							<OPTION value=44>TLAJOMULCO</OPTION>
							<OPTION value=63>TLALNEPANTLA</OPTION>
							<OPTION value=100>TLALTIZAPAN</OPTION>
							<OPTION value=89>TLAPACOYAN</OPTION>
							<OPTION value=42>TLAQUEPAQUE</OPTION>
							<OPTION value=99>TLAQUILTENANGO</OPTION>
							<OPTION value=183>TLAZAZALCA</OPTION>
							<OPTION value=197>TODOS SANTOS</OPTION>
							<OPTION value=106>TOLUCA</OPTION>
							<OPTION value=69>TONALA</OPTION>
							<OPTION value=170>TOPOLOBAMPO</OPTION>
							<OPTION value=29>TORREON</OPTION>
							<OPTION value=199>TRES VALLES</OPTION>
							<OPTION value=1025>TUXPAN</OPTION>
							<OPTION value=35>TUXTLA GUTIERREZ</OPTION>
							<OPTION value=236>URES</OPTION>
							<OPTION value=57>URSULO GALVÁN</OPTION>
							<OPTION value=1027>URUAPAN</OPTION>
							<OPTION value=167>URUETARO</OPTION>
							<OPTION value=1014>VALLE DE BRAVO</OPTION>
							<OPTION value=18>VERACRUZ</OPTION>
							<OPTION value=62>VILLA CORREGIDORA</OPTION>
							<OPTION value=138>VILLA CUAUHTEMOC</OPTION>
							<OPTION value=191>VILLA DE COLORINES</OPTION>
							<OPTION value=1017>VILLA DEL CARBON</OPTION>
							<OPTION value=228>VILLA JUAREZ</OPTION>
							<OPTION value=174>VILLA NICOLÁS ROMERO</OPTION>
							<OPTION value=97>VILLA UNION</OPTION>
							<OPTION value=38>VILLAFLORES</OPTION>
							<OPTION value=144>VISTA HERMOSA</OPTION>
							<OPTION value=16>XALAPA</OPTION>
							<OPTION value=1018>XALATLACO</OPTION>
							<OPTION value=15>XALISCO</OPTION>
							<OPTION value=125>XONACATLAN</OPTION>
							<OPTION value=102>XOXOCOTLA</OPTION>
							<OPTION value=145>YURECUARO</OPTION>
							<OPTION value=53>ZACATECAS</OPTION>
							<OPTION value=92>ZACATEPEC</OPTION>
							<OPTION value=13>ZAMORA</OPTION>
							<OPTION value=46>ZAPOTLANEJO</OPTION>
							<OPTION value=58>ZEMPOALA</OPTION>
							<OPTION value=83>ZIHUATANEJO</OPTION>
							<OPTION value=155>ZIMAPAN</OPTION>
							<OPTION value=110>ZINACANTEPEC</OPTION>
							<OPTION value=142>ZINAPECUARO</OPTION>
							<OPTION value=1012>ZITÁCUARO</OPTION>
							<OPTION value=226>ZUMPANGO</OPTION>
						</SELECT> <BR>
						<BR>
						<INPUT style="MARGIN: 0px auto" class=button_submit value=Cambiar
							type=submit>
					</FORM>
				</DIV>
			</DIV>
			<DIV id=ver_canal>
				<DIV class=half></DIV>
				<DIV id=detalle_canal></DIV>
			</DIV>
		</DIV>
	</DIV>
</BODY>
</HTML>
