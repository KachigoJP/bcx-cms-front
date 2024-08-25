# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# Các bước để tham gia dự án

1. Qui trình GitHub

   1. Pull Dev branch
   2. Tạo Branch mới
   3. Qui tắc đặt tên: features/[Tên Page]\_[ngày tạo branch-20220213]
   4. Commit
   5. Rebase
   6. Tạo Pull Request
   7. Nhắn tin báo cáo hoàn thành

2. Các bước để làm việc với dự án React

   1. Cài đặt NPM
   2. Cài đặt package cho dự án “npm install”/yarn
   3. Tham khảo cách sử dụng component trong trang web https://react-bootstrap.github.io/components/alerts
   4. Tham khảo cách thiết kế thực tế ở trang web: https://www.nobleui.com/html/template/demo1/dashboard.html
   5. Tham khảo cách sử dụng bootstrap ở https://getbootstrap.com/docs/5.1/getting-started/introduction/
   6. Dự án chỉ có thể sử dụng bootstrap css, không thể sử dụng bootstrap script. Nếu muốn sử dụng script thì phải sử dụng Component của thư viện react-bootstrap trong mục 3.

3. Qui tắc làm việc: Tạo file đúng chỗ

   1. assets/img: Chứa hình ảnh của dự án như logo…
   2. components: chứa tất cả Components của dự án
   3. Context: chứa context của dự án, context dùng để chia sẻ data cho toàn bộ component
   4. helpers: chứa những file tiện ích dùng để hỗ trợ dự án như constants, types
   5. i18n: chứa thông tin dịch thuật ngôn ngữ của dự án
   6. pages: chứa các trang web của dự án
   7. routes: chứa thông tin các route(điều hướng trang) của dự án
   8. scss: chứa các file qui định style cho dự án

4. Qui tắc lúc làm việc: Tạo Component đúng nơi:
   1. Pages: sẽ chỉ chứa các page chính của dự án
      1. Auth: Sẽ chứa các page liên quan tới đăng nhập quên mật khẩu
      2. Utility: Sẽ chứa các page tiện ích, như là page lỗi 404, 500, bảo trì.
   2. Components
      1. Layout: chứa tất cả Component dùng để tạo nên Layout của dự án
      2. Modals: Chứa tất cả Modals của dự án
