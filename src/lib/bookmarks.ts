export type BookmarkFolderId = string;

export type BookmarkFolder = {
  id: BookmarkFolderId;
  title: string;
  bookmarks: Bookmark[];
  depth: number;
};

export type BookmarkId = string;

export type Bookmark = {
  id: BookmarkId;
  title: string;
  url: string;
  folderId: BookmarkFolderId;
};

export const searchBookmarks = (bookmarks: Bookmark[], search: string) => {
  if (!search) return bookmarks;
  const lc_search = search.toLocaleLowerCase();
  return bookmarks.filter(
    (b) =>
      b.title.includes(lc_search) ||
      b.url.toLocaleLowerCase().includes(lc_search),
  );
};

export const treeTraversalDFS = (
  tree: chrome.bookmarks.BookmarkTreeNode[],
  depth = 0,
): BookmarkFolder[] =>
  tree.flatMap((node) => {
    if (node.children === undefined) return [];
    const childFolders = node.children.filter(
      (child) => child.url === undefined,
    );
    const childBookmarks = node.children.filter(
      (child) => child.url !== undefined,
    );

    if (childBookmarks.length === 0)
      return treeTraversalDFS(childFolders, depth);

    const currentFolder: BookmarkFolder = {
      id: node.id,
      title: node.title,
      depth,
      bookmarks: childBookmarks.map((b) => ({
        id: b.id,
        title: b.title,
        url: b.url || "",
        folderId: node.id,
      })),
    };

    return [currentFolder, ...treeTraversalDFS(childFolders, depth + 1)];
  });

//CRUD
export const updateBookmark = async (bookmark: Bookmark) => {
  await chrome.bookmarks.update(bookmark.id, {
    url: bookmark.url,
    title: bookmark.title,
  });
};

export const removeBookmark = async (bookmark: Bookmark) => {
  await chrome.bookmarks.remove(bookmark.id);
};

export const isBookmarkFolderIdArray = (
  value: unknown,
): value is readonly BookmarkFolderId[] =>
  Array.isArray(value) && value.every((item) => typeof item === "string");
