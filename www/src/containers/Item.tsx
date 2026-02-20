import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useAppDispatch, useAppSelector } from "store/configureStore";
import { selectItem } from "store/item/itemActions";
import { getItemData } from "store/item/itemSelectors";
import ItemOverview from "components/item/ItemOverview";
import ItemAwards from "components/item/ItemAwards";
import ItemMediaList from "components/item/ItemMediaList";
import ArchiveItemMediaList from "components/item/ArchiveItemMediaList";
import { Flex } from "@radix-ui/themes";

const Item: React.FC = () => {
  const { category_id: _category_id, client_id = "", entry_id = "" } = useParams<{
    category_id: string;
    client_id: string;
    entry_id: string;
  }>();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { itemData, archiveItemData } = useAppSelector(getItemData);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (client_id && entry_id) {
      dispatch(selectItem({ client_id, entry_id }) as unknown as { type: string });
    }
  }, [client_id, entry_id, dispatch]);

  const item = itemData as Record<string, unknown>;
  const { has_awards, awards, media_items, title, client_label, description } = item;
  const is_archive = location.pathname.indexOf("/archive") > 0;
  const basePath = location.pathname.replace("/archive", "");
  const linkTo = is_archive ? basePath : location.pathname + "/archive";

  return (
    <div className="main_region">
      <Helmet>
        <title>{String(client_label || "")} : {String(title || "")}</title>
        <meta name="Description" content={String(description || "")}/>
      </Helmet>
      <motion.div
        className="item"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeIn" }}
      >
        <Flex direction="column" gap="4">
          <ItemOverview {...item} is_archive={is_archive} linkTo={linkTo}/>
          {!is_archive && Boolean(has_awards) && <ItemAwards awards={(awards as Array<Record<string, unknown>>) || []}/>}
          {!is_archive ? (
            <ItemMediaList mediaItems={(media_items as Record<string, unknown>) || {}}/>
          ) : (
            <ArchiveItemMediaList mediaItems={archiveItemData as Array<Record<string, unknown>> | null}/>
          )}
        </Flex>
      </motion.div>
    </div>
  );
};

export default Item;
