export interface MakeRootMsg {
    make_root: {
        creator: string;
        editors: string;
        viewers: string;
        trackingnumber: string;
    };
  }
  export interface PostFileMsg {
    post_file: {
        account: string;
        hashparent: string;
        hashchild: string;
        contents: string;
        viewers: string;
        editors: string;
        trackingnumber: string;
    };
  }