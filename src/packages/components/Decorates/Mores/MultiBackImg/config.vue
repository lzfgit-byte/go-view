<template>
  <div class="go-canvas-setting">
    <div class="upload-box">
      <n-upload
        v-model:file-list="uploadFileListRef"
        :show-file-list="false"
        :customRequest="customRequest"
        :onBeforeUpload="beforeUploadHandle"
      >
        <n-upload-dragger>
          <img v-if="optionData.url" class="upload-show" :src="optionData.url" alt="背景" />
          <div class="upload-img" v-show="!optionData.url">
            <img src="@/assets/images/canvas/noImage.png" />
            <n-text class="upload-desc" depth="3">
              背景图需小于 {{ backgroundImageSize }}M ，格式为 png/jpg/gif 的文件
            </n-text>
          </div>
        </n-upload-dragger>
      </n-upload>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { nextTick, PropType, ref, toRef } from 'vue';
  import { option } from './config';
  import { backgroundImageSize } from '@/settings/designSetting';
  import { UploadCustomRequestOptions } from 'naive-ui';
  import { fetchRouteParamsLocation } from '@/utils';
  import { uploadFile } from '@/api/path';
  import { FileTypeEnum } from '@/enums/fileTypeEnum';
  import { ResultEnum } from '@/enums/httpEnum';

  const props = defineProps({
    optionData: { type: Object as PropType<typeof option>, required: true },
  });
  const uploadFileListRef = ref();
  const url = toRef(props.optionData, 'url');
  // 自定义上传操作
  const customRequest = (options: UploadCustomRequestOptions) => {
    const { file } = options;
    nextTick(async () => {
      if (file.file) {
        // 修改名称
        const newNameFile = new File(
          [file.file],
          `${fetchRouteParamsLocation()}_index_background.png`,
          {
            type: file.file.type,
          }
        );
        let uploadParams = new FormData();
        uploadParams.append('object', newNameFile);
        const uploadRes = await uploadFile(uploadParams);
        if (uploadRes && uploadRes.code === ResultEnum.SUCCESS) {
          if (uploadRes.data.fileurl) {
            url.value = uploadRes.data.fileurl;
          } else {
            window['$message'].error('值为空');
            url.value = '';
          }
          return;
        }
        window['$message'].error('添加图片失败，请稍后重试！');
      } else {
        window['$message'].error('添加图片失败，请稍后重试！');
      }
    });
  };
  // 上传图片前置处理
  //@ts-ignore
  const beforeUploadHandle = async ({ file }) => {
    uploadFileListRef.value = [];
    const type = file.file.type;
    const size = file.file.size;

    if (size > 1024 * 1024 * backgroundImageSize) {
      window['$message'].warning(`图片超出 ${backgroundImageSize}M 限制，请重新上传！`);
      return false;
    }
    if (type !== FileTypeEnum.PNG && type !== FileTypeEnum.JPEG && type !== FileTypeEnum.GIF) {
      window['$message'].warning('文件格式不符合，请重新上传！');
      return false;
    }
    return true;
  };
</script>
<style lang="scss" scoped>
  $uploadWidth: 326px;
  $uploadHeight: 193px;
  @include go(canvas-setting) {
    padding-top: 20px;
    .upload-box {
      cursor: pointer;
      margin-bottom: 20px;
      @include deep() {
        .n-upload-dragger {
          padding: 5px;
          width: $uploadWidth;
          background-color: rgba(0, 0, 0, 0);
        }
      }
      .upload-show {
        height: $uploadHeight;
        border-radius: 5px;
      }
      .upload-img {
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          height: 150px;
        }
        .upload-desc {
          padding: 10px 0;
        }
      }
    }
  }
</style>
