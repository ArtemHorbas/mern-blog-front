import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import { SideBlock } from "./SideBlock";
import { useDispatch } from "react-redux";
import { fetchPosts, fetchSortedPosts, setSortedPosts } from "../redux/slice/post";
import { myAxios } from "../axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const TagsBlock = ({ items, isLoading, paramId, setActive }) => {
  
	const dispatch = useDispatch()
	

	const setActiveTag = async (name) => {
		try {
			setActive(name)
			let tag = name
			dispatch(fetchSortedPosts({tag, paramId}))
		} catch (error) {
			console.error(error)
			alert('Error while sorting posts')
		}
	}

	const setAllTags = async () => {
		try {
			setActive('null')
			dispatch(fetchPosts(paramId))
		} catch (error) {
			console.error(error)
			alert('Error while taking posts')
		}
	}
	
	return (
    <SideBlock title="Tags">
			<Button 
				variant="outlined" 
				size="large"
				style={{ margin: "10px" }}
				onClick={setAllTags}
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
                  <ListItemText onClick={() => setActiveTag(name)} primary={name} />
                )}
              </ListItemButton>
            </ListItem>
          </a>
        ))}
      </List>
    </SideBlock>
  );
};
