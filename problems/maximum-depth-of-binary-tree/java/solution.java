// Maximum Depth of Binary Tree - Java Solution
// Maximum Depth of Binary Tree - Optimal Java Solution (Trees & Graphs)
import java.util.*;

public class Solution {
    public int maximumdepthofbinarytree(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        
        int result = 0;
        // Trees & Graphs state tracking
        for (int i = 0; i < nums.length; i++) {
            result += nums[i];
        }
        return result;
    }
}
