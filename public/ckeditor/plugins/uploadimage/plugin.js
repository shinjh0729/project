﻿/*
 Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
(function(){CKEDITOR.plugins.add("uploadimage",{requires:"uploadwidget",onLoad:function(){CKEDITOR.addCss(".cke_upload_uploading img{opacity: 0.3}")},init:function(d){if(CKEDITOR.plugins.clipboard.isFileApiSupported){var e=CKEDITOR.fileTools,i=e.getUploadUrl(d.config,"image");e.addUploadWidget(d,"uploadimage",{supportedTypes:/image\/(jpeg|png|gif)/,uploadUrl:i,fileToElement:function(){var a=new CKEDITOR.dom.element("img");a.setAttribute("src",j);return a},parts:{img:"img"},onUploading:function(a){this.parts.img.setAttribute("src",
a.data)},onUploaded:function(a){this.replaceWith('<img src="'+a.url+'" width="'+this.parts.img.$.naturalWidth+'" height="'+this.parts.img.$.naturalHeight+'">')}});d.on("paste",function(a){if(a.data.dataValue.match(/<img[\s\S]+data:/i)){var a=a.data,c=document.implementation.createHTMLDocument(""),c=new CKEDITOR.dom.element(c.body),g,b,f;c.data("cke-editable",1);c.appendHtml(a.dataValue);g=c.find("img");for(f=0;f<g.count();f++)if(b=g.getItem(f),b.getAttribute("src")&&"data:"==b.getAttribute("src").substring(0,
5)&&!b.data("cke-upload-id")&&!b.isReadOnly(1)){var h=d.uploadsRepository.create(b.getAttribute("src"));h.upload(i);e.markElement(b,"uploadimage",h.id);e.bindNotifications(d,h)}a.dataValue=c.getHtml()}})}}});var j="data:image/gif;base64,R0lGODlhDgAOAIAAAAAAAP///yH5BAAAAAAALAAAAAAOAA4AAAIMhI+py+0Po5y02qsKADs="})();