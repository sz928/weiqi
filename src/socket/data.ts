// 注意：当白棋是位置需要换一下方向

/**登录请求 */
interface loginReq {
    /**房间ID */
    roomid: number;
}
/**登录响应 */
interface loginRes {
    /**加入成功为0,失败为1 */
    code: number
    /**当前玩家执棋颜色 */
    meColreBlack: boolean;
    pieceArr: piece[];
}
/**棋子mode */
interface piece {
    x: number;
    y: number;
    isBlack: boolean;
}

/**房间状态 */
interface roomSync {
    playerCount: number;
    nowColreBlack: boolean;
}

/**下棋请求 */
interface playChessReq {
    piece: piece;
}
// 下棋响应
interface playChessRes {
    piece: piece;
}

// 结算推送
interface resultPush {
    isBlackWin: boolean;
}

enum MsgId {
    loginReq,
    loginRes,
    roomSync,
    playChessReq,
    playChessRes,
    resultPush
}