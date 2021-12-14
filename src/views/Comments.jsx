import { makeStyles } from '@material-ui/core';
import {
  Checkbox,
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import commentApi from 'api/commentApi';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from 'reactstrap';
import toastifyAlert from 'utils/toastify';
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },

  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: theme.spacing(4),
  },

  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
  table: {},
  edit: {
    marginRight: theme.spacing(1),
  },
}));
function Comments(props) {
  const [commentList, setCommentList] = useState([]);
  const [checked, setChecked] = useState();
  useEffect(() => {
    commentApi
      .getAll()
      .then((response) => {
        const { data } = response;
        setCommentList(data);
      })
      .catch((error) => {
        console.log(error, error.response);
      });
  }, []);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const classes = useStyles();

  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };
  const handleChangeCheckbox = (e) => {
    const { name, checked } = e.target;
    setChecked(checked);
  };
  const onEditComment = (comment) => {
    const newComment = { ...comment, deleteAt: checked };
    commentApi
      .update(comment.id, newComment)
      .then((res) => {
        toastifyAlert.success('Cập nhật thành công!');
        const { data } = res;
        console.log(data);
        setCommentList(
          commentList.filter((value, index) => {
            return value.id != comment.id;
          })
        );
      })
      .catch((error) => console.log(error));
  };
  //get current commentt
  const indexOfLastComment = page * rowsPerPage;
  const indexOfFirstComment = indexOfLastComment - rowsPerPage;
  const currentCommentList = commentList.slice(indexOfFirstComment, indexOfLastComment);
  return (
    <Box className={classes.root}>
      <Box className={classes.titleContainer}>
        <Typography variant="h4">Quản lý bình luận</Typography>
      </Box>

      {/* <Box mb={3}>
    <StudentFilters
      filter={filter}
      cityList={cityList}
      onChange={handleFilterChange}
      onSearchChange={handleSearchChange}
    />
  </Box> */}

      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nội dung</TableCell>
              <TableCell></TableCell>
              <TableCell>Ngày đăng</TableCell>
              <TableCell>Bài viết</TableCell>
              <TableCell>Người đăng bình luận</TableCell>
              <TableCell>Trạng thái bình luận</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {currentCommentList.map((comment) => (
              <TableRow key={comment.id}>
                <TableCell>{comment.id}</TableCell>
                <TableCell>{comment.content}</TableCell>
                <TableCell>
                  {
                    <img
                      style={{ width: '150px', height: '100px' }}
                      src={
                        'http://localhost:8080/api/v1/files/download/image?filename=' +
                        comment.image
                      }
                      alt="image"
                    />
                  }
                </TableCell>

                <TableCell>{comment.createAt}</TableCell>
                <TableCell>{comment.postId}</TableCell>
                <TableCell>{comment.accountsId}</TableCell>
                <TableCell>
                  <Checkbox
                    onChange={handleChangeCheckbox}
                    defaultChecked={comment.deleteAt}
                    name="deleteAt"
                  />
                </TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    className={classes.edit}
                    color="primary"
                    onClick={() => onEditComment?.(comment)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box my={2} display="flex" justifyContent="center">
        <Pagination
          color="primary"
          count={Math.ceil(commentList.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}

Comments.propTypes = {};

export default Comments;
