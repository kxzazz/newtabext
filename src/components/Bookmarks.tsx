import { useBookmarkFolders } from "../hooks/use-bookmark-folders";
import { BookmarkFolder } from "../lib/bookmarks";

const Bookmarks = () => {
  const bookmarkFolders = useBookmarkFolders();

  return (
    <div>
      {bookmarkFolders.map((folder) => (
        <BookmarkList folder={folder} />
      ))}
    </div>
  );
};

interface BookmarkListProps {
  folder: BookmarkFolder;
}

const BookmarkList = ({ folder }: BookmarkListProps) => {
  const bookmarks = folder.bookmarks;
  return <>{bookmarks.map((e) => JSON.stringify(e))}</>;
};
export default Bookmarks;
