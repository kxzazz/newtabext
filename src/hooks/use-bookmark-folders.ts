import { useEffect, useState } from "react";
import { BookmarkFolder, treeTraversalDFS } from "../lib/bookmarks";

export const useBookmarkFolders = () => {
  const [bookmarkFolders, setBookmarkFolders] = useState<BookmarkFolder[]>([]);

  useEffect(() => {
    getBookmarkFolders()
      .then((bf) => setBookmarkFolders(bf))
      .catch((err) => console.error(err));
  }, []);
  return bookmarkFolders;
};

const getBookmarkFolders = async (): Promise<BookmarkFolder[]> => {
  return treeTraversalDFS(await chrome.bookmarks.getTree());
};
