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