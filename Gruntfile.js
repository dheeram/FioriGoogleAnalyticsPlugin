module.exports = function (grunt) {
	"use strict";
	var targetDir = "dist";
	var abapDevelopmentUser = process.env.ABAP_DEVELOPMENT_USER;
	var abapDevelopmentPassword = process.env.ABAP_DEVELOPMENT_PASSWORD;
	var abapDevelopmentServerHost = process.env.ABAP_DEVELOPMENT_SERVER_HOST;
	var abapApplicationName = process.env.ABAP_APPLICATION_NAME;
	var abapApplicationDesc = process.env.ABAP_APPLICATION_DESC;
	var abapPackage = process.env.ABAP_PACKAGE;
	var gitCommit = process.env.CI_COMMIT_TITLE || "transport";

	var config = {
		nwabap_ui5uploader: {
			options: {
				conn: {
					server: abapDevelopmentServerHost
				},
				auth: {
					user: abapDevelopmentUser,
					pwd: abapDevelopmentPassword
				}
			},
			upload_build: {
				options: {
					ui5: {
						package: abapPackage,
						bspcontainer: abapApplicationName,
						bspcontainer_text: abapApplicationDesc,
						calc_appindex: true,
						transportno: gitCommit.trim().substr(0, 10)
					},
					resources: {
						cwd: targetDir,
						src: "**/*.*"
					}
				}
			}
		}
	};

	grunt.loadNpmTasks("grunt-nwabap-ui5uploader");
	grunt.loadNpmTasks("@sap/grunt-sapui5-bestpractice-build");

	grunt.config.merge(config);

	grunt.registerTask("deploy", ["nwabap_ui5uploader"]);
	grunt.registerTask("default", [
		"clean",
		"lint",
		"build"
	]);
};