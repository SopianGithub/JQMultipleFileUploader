function upload_multiple()
	{
		$name_file = $this->input->get('name_files') ? $this->input->get('name_files') : null;
		$files 		= $_FILES;
		$data_files = array();
		$this->load->library('upload');

		$name = $name_file.$files ['files'] ['name'] [0];
        $_FILES ['files'] ['name'] 		= $name;
        $_FILES ['files'] ['type'] 		= $files ['files'] ['type'] [0];
        $_FILES ['files'] ['tmp_name'] 	= $files ['files'] ['tmp_name'] [0];
        $_FILES ['files'] ['error'] 	= $files ['files'] ['error'] [0];
        $_FILES ['files'] ['size'] 		= $files ['files'] ['size'] [0];

        $config['upload_path'] 		= './media';
		$config['allowed_types'] 	= 'pdf|jpg|jpeg';
		$config['overwrite'] 		= TRUE;
		$config['remove_spaces'] 	= TRUE;
		$this->upload->initialize($config);
        if(!($this->upload->do_upload('files')) || $files ['files'] ['error'] [0] !=0){
            $this->session->set_flashdata('notif',print_r($this->upload->display_errors()));
        }else{
            $upload_data = $this->upload->data();
            $data_files = $upload_data;
        }
        echo json_encode($data_files);
	}
