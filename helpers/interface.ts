export interface MakeRootMsg {
    make_root: {
        editors: string;
        viewers: string;
        trackingnumber: string;
    };
  }
  export interface PostFilesMsg {
    post_files: {
        account: string;
        hashparent: string;
        hashchild: string;
        contents: string;
        viewers: string;
        editors: string;
        trackingnumber: string;
    };
  }
  export interface DeleteFileMsg {
    delete_file: {
        hashpath: string;
        account: string;
    };
  }

  export interface BuyStorageMsg {
    buy_storage: {
        foraddress: string;
        duration: string;
        bytes: string;
        paymentdenom: string;
    };
  }
