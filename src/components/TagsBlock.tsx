import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import { SideBlock } from "./SideBlock";
import { Button } from "@mui/material";
import { setActiveTag } from "../redux/filter/slice";
import { useAppDispatch } from "../redux/store";


interface ITagsBlock{
	items: string[], 
	isLoading: boolean
}

export const TagsBlock: React.FC<ITagsBlock> = ({ items, isLoading }) => {
  
	const dispatch = useAppDispatch()

	return (
    <SideBlock title="Tags">
			<Button 
				variant="outlined" 
				size="large"
				style={{ margin: "10px" }}
				onClick={() => dispatch(setActiveTag('null'))}
			>
				All Tags
			</Button>
      <List>
        {(isLoading ? [...Array(5)] : items).map((name, index) => (
          <a
            style={{ textDecoration: "none", color: "black" }}
						key={index}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <ListItemText onClick={() => dispatch(setActiveTag(name))} primary={name} />
                )}
              </ListItemButton>
            </ListItem>
          </a>
        ))}
      </List>
    </SideBlock>
  );
};
