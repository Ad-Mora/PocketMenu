from storages.backends.s3boto import S3BotoStorage

StaticfilesRootS3BotoStorage = lambda: S3BotoStorage(location='staticfiles')
MediaRootS3BotoStorage  = lambda: S3BotoStorage(location='media')