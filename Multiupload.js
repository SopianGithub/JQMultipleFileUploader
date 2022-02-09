class MultiUpload {
    constructor(form, list = null, name_file = null){
        $(`#${form}`).fileupload({
            dataType: 'json',
            url: `${url_base}index.php/tools/upload_multiple?name_files=${name_file}`,
            add: function (e, data) {
                console.log(data);
                $(".progress-bar-success").css('width', '0%');
                $('.progress-extended').text('Uploading...');
                data.submit();
            },
            progress: function (e, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10);
                $(".progress-bar-success").css('width', progress+'%');
            },
            fail: function (e, data) {
                $('.progress-extended').text(data.textStatus);
            },
            done: function (e, data) {
                $(`<p/>`).html(`
                    <div class="${data.result.file_name.replace(/[|&;$%@"<>()+,.]/g, "")}">
                        <table role="presentation" class="table table-striped">
                            <tbody class="files">
                                <tr class="template-upload fade in">
                                    <td>
                                        
                                    </td>
                                    <td>
                                        <a href="${url_base}media/${data.result.file_name}" target="_blank">
                                            <i class="glyphicon glyphicon-file"></i>
                                            <p class="name">${data.result.file_name}</p>
                                            <strong class="error text-danger"></strong>
                                        </a>
                                    </td>
                                    <td>
                                        <p class="size">${data.result.file_size} KB</p>
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-danger delete"
                                            data-url="${url_base}media/${data.result.file_name}"
                                            data-file="${data.result.file_name}">
                                            <i class="glyphicon glyphicon-ban-trash"></i>
                                            <span>Delete</span>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                `).appendTo($(`#files_list`));
               
                if ($(`#${list}`).val() != '') {
                    $(`#${list}`).val($(`#${list}`).val() + '||');
                }
                $(`#${list}`).val($(`#${list}`).val() + data.result.file_name);

                $('.progress-extended').text('Upload Success');

                setTimeout(() => {
                    $(".progress-bar-success").css('width', '0%');
                }, 1000);

                let files = $("#file_multi_ids").val();
                if(files != '')
                    $("#btnSubmitKb").removeAttr('disabled', false);

                $(document).on('click', '.delete', function(event) {
                    event.preventDefault();
                    let doc = $(this).attr('data-url');
                    let name = $(this).attr('data-file');
                    let classfile = name.replace(/[|&;$%@"<>()+,.]/g, "");
                    let allFiles = $("#file_multi_ids").val();
                    let arrFiles = allFiles.split("||");
                    let afterFil = arrFiles.filter(function(index) {
                        if(index != name)
                            return index
                    });
                    let strFiles = afterFil.join("||");
                    $("#file_multi_ids").val(strFiles);

                    $.ajax({
                        url: `${url_base}index.php/tools/remove_upload`,
                        type: 'POST',
                        data: {file: name},
                        success: function(result){
                            $(`.${classfile}`).remove();
                        }
                    });
                    
                });
            }
        });
    }
}

class SingleUpload {
    constructor(form, list = null, name_file = null){
        $(`#${form}`).fileupload({
            dataType: 'json',
            url: `${url_base}index.php/tools/upload_multiple?name_files=${name_file}`,
            add: function (e, data) {
                $(`.progress-bar-success-${list}`).css('width', '0%');
                $(`.progress-extended-${list}`).text('Uploading...');
                data.submit();
            },
            progress: function (e, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10);
                $(`.progress-bar-success-${list}`).css('width', progress+'%');
            },
            fail: function (e, data) {
                $(`.progress-extended-${list}`).text(data.textStatus);
            },
            done: function (e, data) {
                $(`#${list}_list`).html(`
                    <div class="${data.result.file_name.replace(/[|&;$%@"<>()+,.]/g, "")}">
                        <table role="presentation" class="table table-striped">
                            <tbody class="files">
                                <tr class="template-upload fade in">
                                    <td>
                                        
                                    </td>
                                    <td>
                                        <a href="${url_base}media/${data.result.file_name}" target="_blank">
                                            <i class="glyphicon glyphicon-file"></i>
                                            <p class="name">${data.result.file_name}</p>
                                            <strong class="error text-danger"></strong>
                                        </a>
                                    </td>
                                    <td>
                                        <p class="size">${data.result.file_size} KB</p>
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-danger delete"
                                            data-url="${url_base}media/${data.result.file_name}"
                                            data-file="${data.result.file_name}">
                                            <i class="glyphicon glyphicon-ban-trash"></i>
                                            <span>Delete</span>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                `);
               
                $(`#${list}`).val(data.result.file_name);

                $(`.progress-extended-${list}`).text('Upload Success');

                $(document).on('click', '.delete', function(event) {
                    event.preventDefault();
                    let doc = $(this).attr('data-url');
                    let name = $(this).attr('data-file');
                    let classfile = name.replace(/[|&;$%@"<>()+,.]/g, "");
                    $(`#${list}`).val('');

                    $.ajax({
                        url: `${url_base}index.php/tools/remove_upload`,
                        type: 'POST',
                        data: {file: name},
                        success: function(result){
                            $(`.${classfile}`).remove();
                        }
                    });
                    
                });
            }
        });
    }
}


class MultiDoc {
    constructor(form, list = null, name_file = null){
        $(`#${form}`).fileupload({
            dataType: 'json',
            url: `${url_base}index.php/tools/upload_multiple?name_files=${name_file}`,
            add: function (e, data) {
                console.log(data);
                $(`.progress-bar-success-${list}`).css('width', '0%');
                $(`.progress-extended-${list}`).text('Uploading...');
                data.submit();
            },
            progress: function (e, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10);
                $(`.progress-bar-success-${list}`).css('width', progress+'%');
            },
            fail: function (e, data) {
                $(`.progress-extended-${list}`).text(data.textStatus);
            },
            done: function (e, data) {
                $(`<p/>`).html(`
                    <div class="${data.result.file_name.replace(/[|&;$%@"<>()+,.]/g, "")}">
                        <table role="presentation" class="table table-striped">
                            <tbody class="files">
                                <tr class="template-upload fade in">
                                    <td>
                                        
                                    </td>
                                    <td>
                                        <a href="${url_base}media/${data.result.file_name}" target="_blank">
                                            <i class="glyphicon glyphicon-file"></i>
                                            <p class="name">${data.result.file_name}</p>
                                            <strong class="error text-danger"></strong>
                                        </a>
                                    </td>
                                    <td>
                                        <p class="size">${data.result.file_size} KB</p>
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-danger delete"
                                            data-url="${url_base}media/${data.result.file_name}"
                                            data-file="${data.result.file_name}">
                                            <i class="glyphicon glyphicon-ban-trash"></i>
                                            <span>Delete</span>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                `).appendTo($(`#${list}_list`));
               
                if ($(`#${list}`).val() != '') {
                    $(`#${list}`).val($(`#${list}`).val() + '||');
                }
                $(`#${list}`).val($(`#${list}`).val() + data.result.file_name);

                $(`.progress-extended-${list}`).text('Upload Success');

                setTimeout(() => {
                    $(`.progress-bar-success${list}`).css('width', '0%');
                }, 1000);

                $(document).on('click', '.delete', function(event) {
                    event.preventDefault();
                    let doc = $(this).attr('data-url');
                    let name = $(this).attr('data-file');
                    let classfile = name.replace(/[|&;$%@"<>()+,.]/g, "");
                    let allFiles = $(`#${list}`).val();
                    let arrFiles = allFiles.split("||");
                    let afterFil = arrFiles.filter(function(index) {
                        if(index != name)
                            return index
                    });
                    let strFiles = afterFil.join("||");
                    $(`#${list}`).val(strFiles);

                    $.ajax({
                        url: `${url_base}index.php/tools/remove_upload`,
                        type: 'POST',
                        data: {file: name},
                        success: function(result){
                            $(`.${classfile}`).remove();
                        }
                    });
                    
                });
            }
        });
    }
}
